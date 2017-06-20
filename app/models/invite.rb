# == Schema Information
#
# Table name: invites
#
#  id              :integer          not null, primary key
#  user_id         :integer          not null
#  board_id        :integer          not null
#  recipient_email :string           default("")
#  code            :string           not null
#  status          :integer          default("0")
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Invite < ActiveRecord::Base
  MEMBER_LIMIT = 10
  enum status: [:not_sent, :sent, :accepted, :declined], _suffix: true

  validates :board, :board_member, presence: true
  validate :person_has_not_been_invited_before, on: :create
  validate :has_remaining_invites, on: :create
  before_validation :create_code

  belongs_to :board
  belongs_to :board_member, class_name: 'User', foreign_key: 'user_id'


  def create_code
    self.code ||= SecureRandom.base64()
  end

  private

  def has_remaining_invites
    invite_count = Invite.where(board_id: self.board_id, status: [:not_sent, :sent]).count
    if MEMBER_LIMIT - board.members.count - invite_count <= 0
      errors.add(:invites, 'You do not have any remaining invites.')
    end
  end

  def person_has_not_been_invited_before
    if Invite.where(board_id: self.board_id, recipient_email: self.recipient_email).count != 0
      errors.add(:invite, 'This person has already been invited to your board.')
    end
  end
end
