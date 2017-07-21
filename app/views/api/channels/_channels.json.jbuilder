json.set! :byId do
  channels.each do |channel|
    # next if !channel.has_subscriber? current_user
    info = channel_info_by_id[channel.id]
    json.set! channel.id do
      json.id channel.id
      json.board_id channel.board_id
      json.title channel.title
      json.permission channel.permission
      json.messages []
      json.unread_messages 0
      json.latest nil
      json.has_more info[:has_more]
      json.has_loaded_messages false
    end
  end
end
