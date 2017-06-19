
json.set! :boards do
  json.partial! 'api/boards/boards', boards: @invite.boards,
end
