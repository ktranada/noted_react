class BoardChannel < ApplicationCable::Channel
  def subscribed
    stream_from "board:#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
