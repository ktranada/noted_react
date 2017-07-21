# == Schema Information
#
# Table name: lists
#
#  id         :integer          not null, primary key
#  title      :string           not null
#  position   :integer
#  board_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class List  < ActiveRecord::Base
  validates :title, :board, presence: true

  belongs_to :board
  acts_as_list scope: :board, top_of_list: 0

  has_many :cards, -> { order(position: :asc) }, dependent: :destroy

  after_create_commit { ListBroadcastJob.perform_now('create', self, -1) }
end
