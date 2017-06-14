# == Schema Information
#
# Table name: boards
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  ord        :integer          default("0"), not null
#

class Board < ActiveRecord::Base
  validates :owner, :title, presence: true, allow_nil: false

  belongs_to :owner, class_name: "User", foreign_key: "user_id"
  has_many :board_memberships, dependent: :destroy, inverse_of: :board
  has_many :members, through: :board_memberships, source: :user
  has_many :lists

  has_many :conversations

  before_create :set_ord
  after_commit :create_general_conversation, on: :create

  def has_member?(user)
    self.members.include?(user)
  end

  def create_board_membership(user_id, username)
    self.board_memberships.create!(user_id: user_id, username: username)
  end

  private

  def create_general_conversation
    conversation = Conversation.create(board_id: id, title: "General", permission: :public)
  end

  def set_ord
    self.ord = Board.where(user_id: self.user_id).count
  end

end
