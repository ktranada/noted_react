json.set! :byId do
  @subscriptions.each do |sub|
    json.set! sub.id do
      json.extract! sub, :id, :board_id, :channel_id
    end
  end
end
