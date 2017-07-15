json.board_id @board_id
json.list_ids @lists.pluck(:id)

json.set! :lists do
  json.partial! '/api/lists/lists', lists: @lists
end

json.set! :cards do
  json.partial! 'api/cards/cards', cards: @cards
end

json.set! :comments do
  json.partial! 'api/comments/comments', comments: @cards.map(&:comments).flatten
end
