
json.id @board.id
json.members @board.member_ids
json.channels @board.channel_ids
json.lists @board.list_ids

cards = @board.lists.map(&:cards).flatten
json.cards cards.pluck(:id)

comments = cards.map(&:comments).flatten
json.comments comments.pluck(:id)

json.invites @board.invite_ids
