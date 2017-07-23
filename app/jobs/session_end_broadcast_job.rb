class SessionEndBroadcastJob < ApplicationJob
  queue_as :default

  def perform(current_user)
    ActionCable.server.broadcast(
      "user_notifications:#{current_user.id}",
      broadcast_body(:session, 'update', current_user.id, { logout: true, message: 'You have logged out on another device.' })
    )
  end
end
