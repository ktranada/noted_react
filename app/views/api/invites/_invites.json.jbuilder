json.set! :byId do
  invites.each do |invite|
    json.set! invite.id do
      json.id invite.id
      json.board_id invite.board_id
      json.recipient_email invite.recipient_email
      json.code invite.code
      json.status invite.status
    end
  end
end
