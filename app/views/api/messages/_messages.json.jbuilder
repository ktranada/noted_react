json.set! :byId do
  messages.each do |message|
    json.set! message.id do
      json.extract! message, :id, :author_id, :channel_id, :content
      json.timestamp message.created_at.to_i
      json.date message.create_date(current_user)
      json.time message.create_time(current_user)
      json.time_offset message.time_offset(current_user)
    end
  end
end
