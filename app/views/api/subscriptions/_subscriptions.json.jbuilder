json.set! :channelsByBoardId do
  subscriptions do |sub|
    json.set! board_id do
      json.array! subscriptions.pluck(:channel_id)
    end
  end
end
