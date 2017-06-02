json.set! :info do
  json.extract! user, :id
end

json.set! :boards do
  json.set! :currentBoard do
    if user.current_board
      json.partial! "api/boards/board", board: user.current_board
    else
      json.null!
    end
  end

  json.set! :index do
    json.array! user.boards do |board|
      json.partial! "api/boards/board", board: board
    end
  end
end
