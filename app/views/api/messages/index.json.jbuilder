json.channel_id @channel.id
json.channel_messages @messages.pluck(:id)
json.has_more @messages.length > 0
json.set! :messages  do
  json.set! :byId do
    @messages.each do |message|
      json.set! message.id do
        json.extract! message, :id, :author_id, :content, :channel_id
        json.date message.create_date
        json.time message.create_time
        json.time_offset message.time_offset
      end
    end
  end
end
