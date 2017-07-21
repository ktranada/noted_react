class ListBroadcastJob < ApplicationJob
  queue_as :default

  def perform(action, list, updated_by)
    ActionCable.server.broadcast(
      "board_content:#{list.board_id}",
      broadcast_body(:list, action, updated_by, render_jbuilder('api/lists/list', { list: list }) )
    )
  end
end
