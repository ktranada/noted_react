json.set! :byId do
  memberships.each do |mbs|
    json.set! mbs.id do
      json.id mbs.id
      json.user_id mbs.user_id
      json.username mbs.username
    end
  end
end
