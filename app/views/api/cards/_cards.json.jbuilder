json.set! :byId do
  cards.each do |card|
    json.set! card.id do
      json.id card.id
      json.title card.title
      json.ord card.ord
      json.description card.description || ''
    end
  end
end
