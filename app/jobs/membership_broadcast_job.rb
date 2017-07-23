class MembershipBroadcastJob < ApplicationJob
  queue_as :default

  def perform(action, membership, body = nil)
    body ||= render_jbuilder('api/board_memberships/membership', {
        membership: membership,
        action: action
      }
    )
    ActionCable.server.broadcast("membership:#{membership.board_id}", broadcast_body(
      :membership,
      action,
      -1,
      body
    ))
  end
end
