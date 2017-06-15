order = []
json.set! :byId do
  boards.each do |board|
    json.set! board.id do
      json.extract! board, :id, :title, :ord
      # json.set! :mbrs do
      #   json.array! board.members.pluck(:id)
      # end
    end
    order << board.id
  end
end

json.order order
