json.set! :usersByBoardId do
  json.set! board.id do
    memberships.each do |mbs|
      json.set! mbs.user_id, mbs.status
    end
  end
end
