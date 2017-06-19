# == Schema Information
#
# Table name: cards
#
#  id          :integer          not null, primary key
#  list_id     :integer          not null
#  title       :string           not null
#  ord         :integer          default("0"), not null
#  description :text             default("")
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Card < ActiveRecord::Base
  validates :list, :title, :ord, presence: true

  belongs_to :list
  has_many :comments, -> { order "created_at DESC" }, dependent: :destroy
  has_many :card_assignments, dependent: :destroy
  has_many :assignees, through: :card_assignments, source: :user

  default_scope { order(:ord) }

  delegate :board, to: :list

  def assign_to_member(user)
    if list.board.has_member?(user)
      CardAssignment.where(user_id: user.id, card_id: id).first_or_creates
    else
      render json: ["User is not part of this board"], status: 401
    end
  end
end
