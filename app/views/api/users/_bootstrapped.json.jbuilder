json.set! :info do
  json.extract! user, :id, :email
end

json.set! :boards do
  # json.currentBoardId user.current_board ? user.current_board.id : json.null!

  json.set! :index do
    user.boards.each do |board|
      json.set! board.id do
        json.extract! board, :id, :title, :ord
      end
    end
  end
end
