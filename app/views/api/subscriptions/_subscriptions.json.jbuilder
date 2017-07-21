json.set! :subscriptions do
  json.set! :channelsByBoardId do
    json.set! board_id do
      json.array! subscriptions.pluck(:channel_id)
    end
  end
end
