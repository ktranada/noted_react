class ChatChannel < ApplicationCable::Channel
  def subscribed
    @board_id = params[:board_id]
    stream_from "chat:b_#{params[:board_id]}:c_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def create_message(data)
    message_params = data['message']
    message = Message.new(
      author_id: current_user.id,
      channel_id: message_params['channel_id'],
      content: message_params['content']
    )

    if message.save
      ActionCable.server.broadcast(
        "chat:b_#{@board_id}:c_#{message.channel_id}", {
          action: 'create',
          board_id: @board_id,
          message: {
            id: message.id,
            author_id: message.author_id,
            channel_id: message.channel_id,
            content: message.content,
            create_date: message.created_at.to_time,
            time_offset: message.time_offset(current_user),
            timestamp: message.created_at.to_i
          }
        }
      )

      ActionCable.server.broadcast("nav_notification:#{@board_id}", {
        board_id: @board_id,
        channel_id: message.channel_id,
        is_nav_notification: true,
        has_unread_messages: true
      })
    end
  end
end
