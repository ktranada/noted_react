json.set! board_id do
  json.array! subscriptions.pluck(:channel_id)
end
