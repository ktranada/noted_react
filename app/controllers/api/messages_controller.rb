class Api::MessagesController < ApplicationController
  def index
    @channel = Channel.find(params[:channel_id])

    @board_id = params[:board_id]

    @latest = params[:latest]
    start_date = @latest.empty? ? Time.now : Time.at(@latest.to_i)
    @messages = @channel.messages.where("created_at < ?", start_date).limit(25) #fetch_messages({ page: params[:page].to_i, limit: 25 })
  end

  private

  def message_params
    params.require(:message).permit(:channel_id, :content)
  end
end
