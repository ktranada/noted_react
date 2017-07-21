json.extract! list, :id, :title, :position, :board_id
if action === 'destroy'
  json.cards card_ids
  json.comments comment_ids
elsif action === 'create'
  json.cards []
end
