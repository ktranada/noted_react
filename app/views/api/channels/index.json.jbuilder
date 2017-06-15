order = []
json.set! :byId do
  @channels.each do |channel|
    json.partial! "api/channels/channel", channel: channel
    order << channel.id
  end
end

json.order order
