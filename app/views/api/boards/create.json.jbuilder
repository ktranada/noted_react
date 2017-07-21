channels = @board.channels
channel_ids = channels.pluck(:id)

json.set! :board do
  json.partial! '/api/boards/board', board: @board
  json.members [current_user.id]
  json.channels channel_ids
  json.invites []
  json.lists []
  json.owner true
  json.isLoaded true
  json.has_loaded_lists true
  json.subscribe_to_nav_notifications false
end

json.partial! '/api/users/users', board: @board, memberships: [@membership]
json.partial! '/api/appearances/appearances', board: @board, memberships: [@membership]
json.partial! '/api/channels/channels', channels: channels, channel_info_by_id: {}
json.invites {}

json.set! :subscriptions do
  json.set! :channelsByBoardId do
    json.set! @board.id, channel_ids
  end
end

json.partial! '/api/loading/initial', board_ids: [@board.id], channel_ids: channel_ids
