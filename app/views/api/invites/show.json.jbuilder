json.extract! @invite, :id, :status
json.board_title @invite.board.title
json.user_exists @invite.recipient.nil?
