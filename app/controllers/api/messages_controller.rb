class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id
    if @message.save
      render :create
    else
      render json: "Message could not be sent", status: 422
    end
  end

  def index
    @channel = Channel.find(params[:channel_id])
    @messages = @channel.fetch_messages({ page: params[:page].to_i, limit: 25 })
  end

  private

  def message_params
    params.require(:message).permit(:channel_id, :content)
  end
end
