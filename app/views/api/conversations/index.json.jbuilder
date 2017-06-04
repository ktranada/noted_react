order = []
json.set! :byId do
  @conversations.each do |conversation|
    json.set! conversation.id do
      json.extract! conversation, :id, :title
    end
    order << conversation.id
  end
end

json.set! :order, order
