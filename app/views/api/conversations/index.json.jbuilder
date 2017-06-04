order = []

@conversations.each do |conversation|
  json.set! conversation.id do
    json.extract! conversation, :id, :title
  end
  order << conversation.id
end

json.set! :order, order
