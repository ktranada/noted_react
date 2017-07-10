json.set! :byId do
  messages.each do |message|
    json.set! message.id do
      json.extract! message, :id, :author_id, :channel_id, :content
    end
  end
end
