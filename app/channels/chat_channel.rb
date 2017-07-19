class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat:b_#{params[:board_id]}:c_#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(data)
    message_params = data['message']
    message = Message.new(
      author_id: current_user.id,
      channel_id: message_params['channel_id'],
      content: message_params['content']
    )

    if message.save
      ActionCable.server.broadcast(
        "chat:b_#{message_params['board_id']}:c_#{message.channel_id}", {
          action: 'create',
          message: render_jbuilder('api/messages/message', {
              message: message,
              current_user: current_user
            }
          )
        }
      )
    end
  end
end
