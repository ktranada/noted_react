class AppearanceChannel < ApplicationCable::Channel
  def subscribed
    stream_from "appearance:#{params[:board_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
