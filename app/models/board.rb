# == Schema Information
#
# Table name: boards
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  title      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  position   :integer          default("0"), not null
#

class Board < ActiveRecord::Base
  validates :owner, :title, presence: true, allow_nil: false

  default_scope { order(:position)}

  belongs_to :owner, class_name: "User", foreign_key: "user_id"
  has_many :invites, dependent: :destroy
  has_many :board_memberships, dependent: :destroy, inverse_of: :board
  has_many :members, through: :board_memberships, source: :user
  has_many :subscriptions, dependent: :destroy
  scope :members, -> { order(:email)}

  has_many :lists, -> {order(:position) }, dependent: :destroy
  has_many :channels, dependent: :destroy

  before_create :set_position

  after_commit :create_general_channel, on: :create

  def has_member?(user)
    self.members.include?(user)
  end

  def create_owner_membership(username)
    invite = Invite.create(user_id: user_id, board_id: id, email: owner.email, status: :owner)
    BoardMembership.create(board_id: id, user_id: user_id, invite_id: invite.id, username: username, status: :online)
  end

  def is_owned_by?(user)
    self.user_id == user.id
  end

  private

  def create_general_channel
    Channel.create(board_id: id, title: "General", permission: :public)
  end

  def set_position
    self.position = Board.where(user_id: self.user_id).count
  end
end
