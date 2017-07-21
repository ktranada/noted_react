order = []
json.set! :boards do
  if boards.length == 0
    json.set! :byId, {}
    json.order []
  else
    json.set! :byId do
      boards.each do |board|
        json.set! board.id do
          json.extract! board, :id, :title, :position
          json.isLoaded false
          json.channels []
          json.members []
          json.lists []
          json.invites []
          json.owner board.is_owned_by?(current_user)
          json.has_loaded_lists false
          json.subscribe_to_nav_notifications true
        end
        order << board.id
      end
    end

    json.order order
  end
end

json.set! :loading do
  json.set! :byBoardId do
    order.each do |id|
      json.set! id do
        json.loadingBoard false
        json.loadingLists false
      end
    end
  end
  json.set! :byChannelId, {}
  json.isUpdatingTimezone false
end
