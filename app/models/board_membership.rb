# == Schema Information
#
# Table name: board_memberships
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  board_id   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class BoardMembership < ActiveRecord::Base
  validates :user_id, :board_id, presence: true

  belongs_to :user
  belongs_to :board, inverse_of: :board_memberships
end
