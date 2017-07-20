class MembershipRemovalJob < ApplicationJob
  queue_as :default

  def perform(current_user, membership)
    ActionCable.server.broadcast("user_notifications:#{membership.user_id}", broadcast_body(
      :membership,
      'destroy',
      current_user.id,
      render_jbuilder('api/board_memberships/destroy', {
        board: membership.board,
        membership: membership
      })
    ))

    ActionCable.server.broadcast("membership:#{membership.board_id}", broadcast_body(
      :membership,
      'destroy',
      current_user.id,
      render_jbuilder('api/board_memberships/membership', {
        membership: membership
      })
    ))
  end
end
