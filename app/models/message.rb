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
  include DateFormatting

  validates :author, :channel, presence: true
  belongs_to :author, class_name: "User", foreign_key: :author_id
  belongs_to :channel


  after_create_commit { MessageCountJob.perform_now(self) }

end
