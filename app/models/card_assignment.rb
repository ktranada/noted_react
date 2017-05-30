# == Schema Information
#
# Table name: card_assignments
#
#  id         :integer          not null, primary key
#  user_id    :integer          not null
#  card_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class CardAssignment < ActiveRecord::Base
  validates :user, :card, presence: true

  belongs_to :user
  belongs_to :card, inverse_of: :card_assignments
end
