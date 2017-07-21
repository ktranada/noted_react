json.set! :loading do
  json.set! :byBoardId do
    board_ids.each do |id|
      json.set! id do
        json.loading_board false
        json.loading_lists false
      end
    end
  end
  json.set! :byChannelId do
    if channel_ids.length == 0
      json.set! {}
    else
      channel_ids.each do |id|
        json.set! id do
          json.loading_messages false
        end
      end
    end
  end
end
