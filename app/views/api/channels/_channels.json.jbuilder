json.set! :byId do
  channels.each do |channel|
    # next if !channel.has_subscriber? current_user
    json.set! channel.id do
      json.id channel.id
      json.board_id channel.board_id
      json.title channel.title
      json.permission channel.permission
    end
  end
end
