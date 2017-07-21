class CommentBroadcastJob < ApplicationJob
  queue_as :default

  def perform(action, board_id, current_user, comment)
    body = broadcast_body(:comment, action, current_user.id,
      render_jbuilder('api/comments/comment', {
        comment: comment,
        current_user: current_user
      })
    )
    ActionCable.server.broadcast("board_content:#{board_id}", body)
  end
end
