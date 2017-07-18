class MessageCountChannel < ApplicationCable::Channel
  def subscribed
    stream_from "message_count:#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
