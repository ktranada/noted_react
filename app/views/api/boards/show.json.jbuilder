json.id @board.id
json.partial! 'api/users/users', board: @board, memberships: @board.board_memberships
json.partial! 'api/appearances/appearances', board: @board, memberships: @board.board_memberships

channel_info_by_id = {}
@subscriptions.each do |sub|
  channel = sub.channel
  channel_info_by_id[channel.id] = {
    has_more: channel.messages.length > 25
  }
end

json.partial! 'api/channels/channels', channels: @board.channels, channel_info_by_id: channel_info_by_id
json.partial! 'api/subscriptions/subscriptions', board_id: @board.id, subscriptions: @subscriptions

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
  json.has_loaded_lists false
  json.subscribe_to_nav_notifications false
end
