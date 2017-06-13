order = []
json.set! :byId do
  @conversations.each do |conversation|
    json.partial! "api/conversations/conversation", conversation: conversation
    order << conversation.id
  end
end

json.order order
