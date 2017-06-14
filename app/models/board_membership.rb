# == Schema Information
#
# Table name: board_memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  board_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  username   :string           not null
#

class BoardMembership < ActiveRecord::Base
  validates :user_id, :board_id, :username, presence: true
  validates :username, uniqueness: { scope: :board_id,
    message: "Username has been taken" }

  belongs_to :user
  belongs_to :board, inverse_of: :board_memberships

  after_commit :subscribe_to_general_conversation, on: :create

  def subscribe_to_general_conversation
    general_conversation = board.conversations.where(title: "General")[0]
    Subscription.create(
      user_id: user.id,
      conversation_id: general_conversation.id
    )
  end
end
