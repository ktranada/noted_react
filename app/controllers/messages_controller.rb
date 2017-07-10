class MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    message.author_id = current_user.id

    if message.save
      ActionCable.server.broadcast("channel_#{message.channel_id}",
        message: message.content,
        create_date: message.formatted_creation_date
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
