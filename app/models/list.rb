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
  validates :title, :position, :board, presence: true

  belongs_to :board
  acts_as_list scope: :board, top_of_list: 0

  has_many :cards, -> { order(position: :asc) }, dependent: :destroy

  scope :ordered, -> { order(:position) }

  # before_create :set_position

  def set_position
    self.position = board.lists.length
  end
end
