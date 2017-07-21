class TimeZoneChannel < ApplicationCable::Channel
  def subscribed
    stream_from "timezone:#{params[:user_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def reload_user
    current_user.reload
  end
end
