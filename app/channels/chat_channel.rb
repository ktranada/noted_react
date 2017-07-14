class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat:#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def create_message(data)
    message = current_user.messages.create!(channel_id: data['channel_id'], content: data['content'])
    ActionCable.server.broadcast("chat:#{message.channel_id}",
      id: message.id,
      author_id: message.author_id,
      channel_id: message.channel_id,
      content: message.content,
      date: message.create_date(current_user),
      time: message.create_time(current_user),
      time_offset: message.time_offset(current_user)
    )

    ActionCable.server.broadcast("notification:#{message.channel_id}", {})
  end
end
