class Api::MessagesController < ApplicationController
  def create
    @message = Message.new(message_params)
    @message.author_id = current_user.id
    if @message.save
      ActionCable.server.broadcast("chat:#{@message.channel_id}",
        board_id: params[:message][:board_id],
        message: {
          id: @message.id,
          author_id: @message.author_id,
          channel_id: @message.channel_id,
          content: @message.content,
          date: @message.create_date(current_user),
          time: @message.create_time(current_user),
          time_offset: @message.time_offset(current_user)
        },
      )

      ActionCable.server.broadcast("notification:#{@message.channel_id}", {})
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
