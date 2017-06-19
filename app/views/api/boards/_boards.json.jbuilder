order = []
json.set! :byId do
  boards.each do |board|
    json.set! board.id do
      json.extract! board, :id, :title, :ord
      json.isLoaded false
      json.isLoading false
      json.channels []
      json.members []
      json.lists []
      json.invites []
      json.owner board.is_owned_by?(current_user)
    end
    order << board.id
  end
end

json.order order
