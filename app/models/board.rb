# == Schema Information
#
# Table name: boards
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Board < ActiveRecord::Base
  validates :owner, :title, presence: true, allow_nil: false

  belongs_to :owner, class_name: "User", foreign_key: "user_id"
  has_many :board_memberships, dependent: :destroy, inverse_of: :boards
  has_many :members, through: :board_memberships, source: :user
  has_many :lists

  has_many :conversations

  after_commit :create_initial_membership, on: :create
  after_commit :create_general_channel, on: :create

  def has_member?(user)
    self.members.include?(user)
  end

  private

  def create_general_channel
    conversation = Conversation.create(board_id: id, title: "General", permission: :public)
    Subscription.create(user_id: user_id, conversation_id: conversation.id)
  end

  def create_initial_membership
    BoardMembership.create(user_id: user_id, board_id: id)
  end
end
