# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  ord        :integer          default("0"), not null
#  board_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class List  < ActiveRecord::Base
  validates :title, :ord, :board, presence: true

  belongs_to :board
  has_many :cards, dependent: :destroy

  default_scope { order(:ord) }
end
