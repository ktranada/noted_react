class Api::MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    message.author_id = current_user.id

    if message.save
      ActionCable.server.broadcast("chat_#{message.channel_id}",
        id: message.id,
        author_id: message.author_id,
        channel_id: message.channel_id,
        content: message.content,
        date: message.create_date,
        time: message.create_time
      )
      render json: {}, status: 200
    else
      render json: message.errors, status: 422
    end
  end

  private

  def message_params
    params.require(:message).permit(:channel_id, :content)
  end
end
