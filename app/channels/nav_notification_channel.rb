class NavNotificationChannel < ApplicationCable::Channel
  def subscribed
    stream_from "nav_notification:#{params[:room]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
