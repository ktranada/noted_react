# == Schema Information
#
# Table name: board_memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  board_id   :integer          not null
#  invite_id  :integer          not null
#  status     :integer          default("0")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  username   :string           not null
#

class BoardMembership < ActiveRecord::Base
  enum status: [:offline, :away, :online], _prefix: true
  default_scope { order(:username) }

  validates :user_id, :board_id, :username, presence: true
  validates :invite_id, presence: true
  validates :username, format: { with: /\A[a-z0-9]+\Z/, message: "Username format is incorrect" },
    uniqueness: { case_sensitive: false, scope: :board_id, message: "Username has been taken" },
    length: { maximum: 16, message: "Username cannot exceed 16 characters" }


  belongs_to :user
  belongs_to :board, inverse_of: :board_memberships
  belongs_to :invite, dependent: :destroy

  after_commit :subscribe_to_general_channel, on: :create
  after_destroy :remove_subscriptions

  delegate :is_owned_by?, to: :board, prefix: true

  after_create_commit { MembershipBroadcastJob.perform_now('create', self) }
  after_update_commit { MembershipBroadcastJob.perform_now('update', self) }

  def self.to_destroy(id)
    memberships = BoardMembership.includes(board: [:members, :invites, lists: [cards: [:comments]], channels: [:messages]]).where(id: id)
    id.kind_of?(Array) ? memberships : memberships.first
  end

  private

  def subscribe_to_general_channel
    channel = board.channels.where(title: "General")[0]
    Subscription.create(
      user_id: user.id,
      channel_id: channel.id,
      board_id: board_id
    )
  end

  def remove_subscriptions
    Subscription.joins(:channel).where(channels: { board_id: board_id }, subscriptions: {user_id: user_id}).destroy_all
  end
end
