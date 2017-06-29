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
  validates :invite_id, presence: true
  validates :username, format: { with: /\A[a-zA-Z0-9]+\Z/, message: "Username format is incorrect" },
    uniqueness: { case_sensitive: false, scope: :board_id, message: "Username has been taken" }

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
end
