json.partial! "api/users/user", user: @user

json.set! :boards do
  json.partial! "api/boards/boards", boards: @user.boards
end
