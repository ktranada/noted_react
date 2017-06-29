ids = []
json.set! :byId do
  @invites.each do |invite|
    json.set! invite.id do
      json.extract! invite, :id, :user_id, :board_id, :email, :code, :status
    end
    ids << invite.id
  end
end

json.board_id @board_id
json.ids ids
json.count @invites.length + @errors.length
json.errors @errors 
