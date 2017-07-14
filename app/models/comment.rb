# == Schema Information
#
# Table name: comments
#
#  id          :integer          not null, primary key
#  user_id     :integer          not null
#  card_id     :integer          not null
#  description :text             not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Comment < ActiveRecord::Base
  include DateFormatting

  validates :author, :card, :description, presence: true

  belongs_to :author, class_name: "User", foreign_key: "user_id"
  belongs_to :card
end
