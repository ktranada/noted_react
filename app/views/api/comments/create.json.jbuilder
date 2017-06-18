json.extract! @comment, :id, :card_id, :description
json.author_id @comment.user_id
json.create_date @comment.formatted_creation_date
