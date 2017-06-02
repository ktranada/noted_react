json.set! :info do
  json.extract! user, :id, :email
end

json.set! :boards do
  json.currentBoardId user.current_board ? user.current_board.id : json.null!
  # json.set! :currentBoardId do
  #   if user.current_board
  #     json.extract! user.current_board, :id
  #   else
  #     json.null!
  #   end
  # end

  json.set! :index do
    json.array! user.boards do |board|
      json.extract! board, :id, :title, :ord
    end
  end
end
