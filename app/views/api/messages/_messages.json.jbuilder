json.set! :byId do
  messages.each do |message|
    json.set! message.id do
      json.extract! message, :id, :author_id, :channel_id, :content
      json.timestamp message.created_at.to_i
      json.date message.create_date
      json.time message.create_time
      json.time_offset message.time_offset
    end
  end
end
