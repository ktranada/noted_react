json.set! :byId do
  cards.each do |card|
    json.set! card.id do
      json.extract! card, :id, :title, :position, :list_id
      json.description card.description || ''
      json.comments card.comments.pluck(:id)
    end
  end
end
