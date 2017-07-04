json.id @board.id

json.set! :info do
  json.members @board.board_memberships.map(&:user).pluck(:id)
  json.channels @board.channels.pluck(:id)
  json.lists @lists.pluck(:id)
  json.invites @invites.pluck(:id)
end


json.set! :members do
  json.partial! 'api/users/users', board: @board, memberships: @board.board_memberships
end

json.set! :channels do
  json.partial! 'api/channels/channels', channels: @board.channels
end

json.set! :lists do
  json.partial! 'api/lists/lists', lists: @lists.ordered
end

cards = @lists.map(&:cards).flatten

json.set! :cards do
  json.partial! 'api/cards/cards', cards: cards
end

json.set! :comments do
  json.partial! 'api/comments/comments', comments: cards.map(&:comments).flatten
end

json.set! :invites do
  json.partial! 'api/invites/invites', invites: @invites
end
