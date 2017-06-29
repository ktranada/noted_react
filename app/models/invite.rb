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
  enum status: [:pending, :accepted, :declined, :owner], _prefix: true

  validates :board, :board_member, :recipient_email, presence: true
  validates :recipient_email, uniqueness: { scope: :board_id, case_sensitive: false }
  validate :person_has_not_been_invited_before, on: :create
  validate :has_remaining_invites, on: :create
  before_validation :create_code

  belongs_to :board
  belongs_to :board_member, class_name: 'User', foreign_key: 'user_id'
  has_one :board_membership

  def find_or_create_user_account(password)
    User.find_by_email(recipient_email) || User.create(email: recipient_email, password: password)
  end

  def has_response?
    hide_from_client? || status_accepted?
  end

  def hide_from_client?
    status_owner? || status_declined?
  end

  def recipient
    User.find_by_email(recipient_email)
  end

  private

  def create_code
    self.code ||= SecureRandom.urlsafe_base64
  end


  def has_remaining_invites
    invite_count = Invite.where(board_id: self.board_id, status: :pending).count
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
