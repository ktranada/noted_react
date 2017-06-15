json.set! channel.id do
  json.extract! channel, :id, :title, :board_id, :permission
end
