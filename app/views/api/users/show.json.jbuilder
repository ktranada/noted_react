json.partial! "api/users/user", user: @user

json.set! :boards do
  json.currentBoardId @user.current_board ? @user.current_board.id : json.null!

  json.set! :index do
    json.array! @user.boards do |board|
      json.extract! board, :id, :title, :ord
    end
  end
end
