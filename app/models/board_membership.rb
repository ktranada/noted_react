# == Schema Information
#
# Table name: board_memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  board_id   :integer          not null
#  invite_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  username   :string           not null
#

class BoardMembership < ActiveRecord::Base
  default_scope { order(:username) }

  validates :user_id, :board_id, :username, presence: true
  validates :invite_id, presence: true, unless: :owned_by_user?
  validates :username, uniqueness: { scope: :board_id,
    message: "Username has been taken" }

  belongs_to :user
  belongs_to :board, inverse_of: :board_memberships

  belongs_to :invite, dependent: :destroy

  after_commit :subscribe_to_general_channel, on: :create

  def subscribe_to_general_channel
    channel = board.channels.where(title: "General")[0]
    Subscription.create(
      user_id: user.id,
      channel_id: channel.id
    )
  end

  def owned_by_user?
    board.owner == user
  end
end
