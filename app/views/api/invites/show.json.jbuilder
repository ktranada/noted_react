json.extract! @invite, :id, :status, :board_id, :email
json.board_title @invite.board.title
json.user_exists !@invite.recipient.nil?
