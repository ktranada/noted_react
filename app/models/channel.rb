# == Schema Information
#
# Table name: channels
#
#  id         :integer          not null, primary key
#  board_id   :integer          not null
#  title      :string           not null
#  permission :integer          default("0"), not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Channel < ActiveRecord::Base
  enum permission: [:public, :private], _suffix: true

  validates :board, :title, :permission, presence: true
  belongs_to :board

  has_many :subscriptions, inverse_of: :channel, dependent: :destroy
  has_many :participants, through: :subscriptions, source: :user
  has_many :messages, dependent: :destroy

  def has_subscriber?(user)
    self.participants.include?(user)
  end
end
