order = []
json.set! :byId do
  @users.each do |user|
    json.set! user.id do
      json.extract! user, :id, :email
    end
    order << user.id
  end
end

json.set! :order, order
