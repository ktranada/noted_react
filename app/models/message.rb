# == Schema Information
#
# Table name: messages
#
#  id         :integer          not null, primary key
#  author_id  :integer          not null
#  channel_id :integer          not null
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Message < ActiveRecord::Base
  validates :author, :channel, presence: true
  belongs_to :author, class_name: "User", foreign_key: :author_id
  belongs_to :channel

  def formatted_creation_date
    created_at.strftime("%b %d %Y, %l:%M %p")
  end

  def create_time
    created_at.strftime("%l:%M %p")
  end

  def create_date
    created_at.strftime("%B #{created_at.day.ordinalize}#{created_at.year != Time.new.year ? ", %Y" : ""}")
  end

  def time_offset
    created_at.hour * 60 + created_at.min
  end
end
