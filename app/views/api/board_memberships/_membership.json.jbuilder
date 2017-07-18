if action
  json.action action
end

json.set! :membership do
  json.extract! membership, :id, :user_id, :board_id, :invite_id, :status, :username
end
