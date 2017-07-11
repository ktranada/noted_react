json.set! :byId do
  messages.each do |message|
    json.set! message.id do
      json.extract! message, :id, :author_id, :channel_id, :content
      json.date message.create_date
      json.time message.create_time
    end
  end
end
