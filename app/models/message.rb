# == Schema Information
#
# Table name: messages
#
#  id              :integer          not null, primary key
#  author_id       :integer          not null
#  conversation_id :integer          not null
#  socket_id       :string           default(""), not null
#  content         :text             not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class Message < ActiveRecord::Base
  validates :author, :conversation, :socket_id, presence: true
  belongs_to :author, class_name: "User", foreign_key: :author_id
  belongs_to :conversation
end
