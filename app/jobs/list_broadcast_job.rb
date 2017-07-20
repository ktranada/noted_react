class ListBroadcastJob < ApplicationJob
  queue_as :default

  def perform(action, list, updated_by)
    ActionCable.server.broadcast(
      "board_content:#{list.board_id}",
      broadcast_body(:list, action, updated_by, {
        id: list.id,
        board_id: list.board_id,
        title: list.title,
        position: list.position
      })
    )
  end
end
