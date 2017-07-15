json.set! :byId do
  comments.each do |comment|
    json.set! comment.id do
      json.id comment.id
      json.card_id comment.card_id
      json.author_id comment.user_id
      json.description comment.description
      json.timestamp comment.created_at.to_i
      json.date comment.create_date(current_user)
      json.time comment.create_time(current_user)
      json.time_offset comment.time_offset(current_user)
    end
  end
end
