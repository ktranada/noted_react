json.id @board.id

json.set! :members do
  json.partial! 'api/users/users', board: @board, memberships: @board.board_memberships
end

json.set! :appearances do
  json.partial! 'api/appearances/appearances', board: @board, memberships: @board.board_memberships
end

channel_info_by_id = {}
messages = []

@subscriptions.each do |sub|
  channel = sub.channel
  channelMessages = channel.messages.order('created_at DESC').limit(25)
  channel_info_by_id[channel.id] = {
    messages: channelMessages.pluck(:id),
    has_more: channel.messages.length > 10
  }
  messages << channelMessages
end

json.set! :channels do
  json.partial! 'api/channels/channels', channels: @board.channels, channel_info_by_id: channel_info_by_id
end



json.set! :subscriptions do
  json.partial! 'api/subscriptions/subscription', board_id: @board.id, subscriptions: @subscriptions
end

json.set! :messages do
  json.partial! 'api/messages/messages', messages: messages.flatten
end

json.set! :lists do
  json.partial! 'api/lists/lists', lists: @board.lists
end

cards = @board.lists.map(&:cards).flatten

json.set! :cards do
  json.partial! 'api/cards/cards', cards: cards
end

json.set! :comments do
  json.partial! 'api/comments/comments', comments: cards.map(&:comments).flatten
end

json.set! :invites do
  json.partial! 'api/invites/invites', invites: @invites
end



json.set! :info do
  json.members @board.board_memberships.map(&:user).pluck(:id)
  json.channels @board.channels.pluck(:id)
  json.lists @board.lists.pluck(:id)
  json.invites @invites.pluck(:id)
  # json.subscriptions @subscriptions.pluck(:id)
end
