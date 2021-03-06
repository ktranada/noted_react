count = @messages.length
json.board_id @board_id
json.channel_id @channel.id
json.channel_messages @messages.pluck(:id) || []
json.has_more count == 25
json.latest count == 0 ? @latest : @messages.last.created_at.to_i
json.set! :messages  do
  json.set! :byId do
    @messages.each do |message|
      json.set! message.id do
        json.extract! message, :id, :author_id, :content, :channel_id
        json.date message.create_date(current_user)
        json.time message.create_time(current_user)
        json.timestamp message.created_at.to_i
        json.time_offset message.time_offset(current_user)
      end
    end
  end
end
