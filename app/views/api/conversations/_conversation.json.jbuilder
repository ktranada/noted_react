json.set! conversation.id do
  json.extract! conversation, :id, :title, :board_id, :permission
end
