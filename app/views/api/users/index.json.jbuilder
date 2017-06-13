order = []
json.set! :byId do
  @memberships.each do |mbs|
    json.set! mbs.user_id do
      json.extract! mbs, :user_id, :username
    end
    order << mbs.user_id
  end
end

json.set! :order, order
