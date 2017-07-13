class Api::MessagesController < ApplicationController
  def index
    @channel = Channel.find(params[:channel_id])
    @messages = @channel.fetch_messages({ page: params[:page].to_i, limit: 25 })
  end

  private

  def message_params
    params.require(:message).permit(:channel_id, :content)
  end
end
