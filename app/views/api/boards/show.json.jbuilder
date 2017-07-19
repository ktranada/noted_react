json.id @board.id

json.set! :members do
  json.partial! 'api/users/users', board: @board, memberships: @board.board_memberships
end

json.set! :appearances do
  json.partial! 'api/appearances/appearances', board: @board, memberships: @board.board_memberships
end

channel_info_by_id = {}

@subscriptions.each do |sub|
  channel = sub.channel
  channel_info_by_id[channel.id] = {
    messages: [],
    has_more: channel.messages.length > 10,
    has_loaded_messages: false
  }
end

json.set! :channels do
  json.partial! 'api/channels/channels', channels: @board.channels, channel_info_by_id: channel_info_by_id
end

json.set! :subscriptions do
  json.partial! 'api/subscriptions/subscriptions', board_id: @board.id, subscriptions: @subscriptions
end

if @isOwner
  json.set! :invites do
    json.partial! 'api/invites/invites', invites: @invites
  end
else
  json.invites []
end

json.set! :info do
  json.extract! @board, :id, :title
  json.members @board.board_memberships.map(&:user).pluck(:id)
  json.channels @board.channels.pluck(:id)
  json.invites @isOwner ? @invites.pluck(:id) : []
  json.owner @isOwner
  json.isLoaded true
end
