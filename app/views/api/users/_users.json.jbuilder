json.set! :byId do
  memberships.each do |mbs|
    json.set! mbs.user_id do
      json.id mbs.user_id
      json.set! :usernamesByBoardId do
        json.set! board.id, mbs.username
      end
    end
  end
end
