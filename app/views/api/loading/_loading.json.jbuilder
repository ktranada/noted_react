json.set! :loading do
  json.set! :byBoardId do
    board_ids.each do |id|
      json.set! id do
        json.loading_board false
        json.loading_lists false
      end
    end
  end
  json.set! :byChannelId, {}
  json.isUpdatingTimezone false
end
