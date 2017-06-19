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
  enum status: [:not_sent, :no_response, :accepted, :declined], _suffix: true

  validates :board, :board_member, presence: true

  belongs_to :board
  belongs_to :board_member, class_name: 'User', foreign_key: 'user_id'

  before_validation :create_code

  def create_code
    self.code ||= SecureRandom.base64()
  end
end
