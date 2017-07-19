class CardBroadcastJob < ApplicationJob
  queue_as :default

  def perform(action, board_id, previous_list_id, card, updated_by)
    body = broadcast_body(:card, action, updated_by, {
      id: card.id,
      list_id: card.list_id,
      title: card.title,
      description: card.description,
      position: card.position
    })
    body[:previous_list_id] = previous_list_id
    ActionCable.server.broadcast("board:#{board_id}", body)
  end
end
