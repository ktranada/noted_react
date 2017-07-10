json.set! :byId do
  channels.each do |channel|
    # next if !channel.has_subscriber? current_user
    messages = messagesByChannelId[channel.id]
    json.set! channel.id do
      json.id channel.id
      json.board_id channel.board_id
      json.title channel.title
      json.permission channel.permission
      json.subscribed !messages.nil?
      json.messages  messages || []
    end
  end
end
