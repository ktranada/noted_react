json.set! :info do
  json.extract! user, :id
end

json.set! :boards do
  json.set! :currentBoard do
    if user.current_board
      json.extract! user.current_board, :id, :title, :ord
    else
      json.null!
    end
  end

  json.set! :index do
    json.array! user.boards do |board|
      json.extract! board, :id, :title, :ord
    end
  end
end
