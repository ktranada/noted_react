class Api::MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    message.author_id = current_user.id

    if message.save
      ActionCable.server.broadcast("channel_#{message.channel_id}",
        id: message.id,
        content: message.content,
        date: message.create_date,
        time: message.create_time
      )
      head :ok
    else
      render json: message.errors, status: 422
    end
  end

  private

  def message_params
    params.require(:message).permit(:channel_id, :content)
  end
end
