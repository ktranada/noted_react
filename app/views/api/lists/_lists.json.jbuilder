json.set! :byId do
  lists.each do |list|
    json.set! list.id do
      json.id list.id
      json.title list.title
      json.ord list.ord
      json.cards list.cards.pluck(:id)
    end
  end
end
