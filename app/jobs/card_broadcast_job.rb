class CardBroadcastJob < ApplicationJob
  queue_as :default

  def perform(action, board_id, previous_list_id, card, updated_by = -1, comment_ids = [])
    body = broadcast_body(:card, action, updated_by, render_jbuilder('api/cards/card', {
          action: action, card: card, comment_ids: comment_ids
        }
      )
    )
    body[:previous_list_id] = previous_list_id
    ActionCable.server.broadcast("board_content:#{board_id}", body)
  end
end
