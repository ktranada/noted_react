class MessageCountJob < ApplicationJob
  queue_as :default

  def perform(message)
    ActionCable.server.broadcast(
      "message_count:#{message.channel_id}", {
        channel_id: message.channel_id
      }
    )
  end
end
