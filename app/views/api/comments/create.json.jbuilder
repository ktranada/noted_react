json.extract! @comment, :id, :card_id, :description
json.author_id @comment.user_id
json.date @comment.create_date(current_user)
json.timestamp @comment.created_at.to_i
json.time @comment.create_time(current_user)
json.time_offset @comment.time_offset(current_user)
