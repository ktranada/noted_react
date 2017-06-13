order = []
json.set! :byId do
  boards.each do |board|
    json.set! board.id do
      json.extract! board, :id, :title, :ord
    end
    order << board.id
  end
end

json.order order
