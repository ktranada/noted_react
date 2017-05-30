# == Schema Information
#
# Table name: cards
#
#  id          :integer          not null, primary key
#  list_id     :integer          not null
#  title       :string           not null
#  ord         :integer          default("0"), not null
#  description :text
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Card < ActiveRecord::Base
  validates :list, :title, :ord, presence: true

  belongs_to :list
  has_many :comments, dependent: :destroy
  has_many :card_assignments, dependent: :destroy
  has_many :assignees, through: :card_assignments, source: :user

  default_scope { order(:ord) }
end
