class UserNotificationsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "user_notifications:#{current_user.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
