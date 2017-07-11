class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:channel_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
