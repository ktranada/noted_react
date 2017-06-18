json.set! :byId do
  comments.each do |comment|
    json.set! comment.id do
      json.id comment.id
      json.card_id comment.card_id
      json.author_id comment.user_id
      json.description comment.description
      json.create_date comment.formatted_creation_date
    end
  end
end
