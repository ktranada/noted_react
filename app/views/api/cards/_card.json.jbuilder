json.extract! card, :id, :list_id, :title, :description, :position

if action === 'destroy'
  json.comments comment_ids
elsif action === 'create'
  json.comments []
end
