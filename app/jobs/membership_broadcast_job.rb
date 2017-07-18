class MembershipBroadcastJob < ApplicationJob
  queue_as :default

  def perform(action, membership)
    ActionCable.server.broadcast(
      "membership:#{membership.board_id}",
      render_jbuilder('api/board_memberships/membership', {
          membership: membership,
          action: action
        }
      )
    )
  end
end
