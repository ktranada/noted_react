order = []
if boards.length == 0
  json.set! :byId, {}
  json.order []
else
  json.set! :byId do
    boards.each do |board|
      json.set! board.id do
        json.extract! board, :id, :title, :position
        json.isLoaded false
        json.isLoading false
        json.channels []
        json.members []
        json.lists []
        json.invites []
        # json.subscriptions []
        json.owner board.is_owned_by?(current_user)
        json.hasLoadedLists false
        json.hasUnreadMessages false
      end
      order << board.id
    end
  end

  json.order order
end
