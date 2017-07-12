class Api::MessagesController < ApplicationController
  def create
    message = Message.new(message_params)
    message.author_id = current_user.id

    if message.save

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
