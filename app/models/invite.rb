# == Schema Information
#
# Table name: invites
#
#  id            :integer          not null, primary key
#  user_id       :integer          not null
#  board_id      :integer          not null
#  invitee_email :string           not null
#  code          :string           not null
#  status        :integer          default("0")
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#

class Invite < ActiveRecord::Base
  enum status: [:no_response, :accepted, :declined], _suffix: true

  validates :board, :board_member, :invitee_email, presence: true

  belongs_to :board
  belongs_to :board_member, class_name: 'User', foreign_key: 'user_id'

  before_validation :create_code

  def create_code
    self.code ||= SecureRandom.base64()
  end
end
