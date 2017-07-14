board_ids = @subscriptions.keys

json.set! :channelsByBoardId do
  board_ids.each do |board|
    json.set! board do
      json.array! @subscriptions[board]
    end
  end
end
