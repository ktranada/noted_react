class BoardNameChannel < ApplicationCable::Channel
  def subscribed
    stream_from "board_name:#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
