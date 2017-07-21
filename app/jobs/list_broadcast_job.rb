class ListBroadcastJob < ApplicationJob
  queue_as :default

  def perform(action, list, updated_by = -1, card_ids = [], comment_ids = [])
    ActionCable.server.broadcast(
      "board_content:#{list.board_id}",
      broadcast_body(:list, action, updated_by, render_jbuilder('api/lists/list', {
            action: action, list: list, card_ids: card_ids, comment_ids: comment_ids
          }
        )
      )
    )
  end
end
