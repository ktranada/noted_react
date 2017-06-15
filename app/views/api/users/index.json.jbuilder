order = []
json.set! :byId do
  @memberships.each do |mbs|
    json.set! mbs.user_id do
      json.id mbs.user_id
      json.username mbs.username
    end
    order << mbs.user_id
  end
end

json.set! :order, order
