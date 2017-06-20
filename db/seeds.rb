# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# rake db:reset => rake db:drop db:create db:migrate db:seed

main_user = User.create!(email: "kev@gmail.com", password: "123pass")
board = Board.create!(title: "React", user_id: main_user.id)
board2 = Board.create!(title: "Redux", user_id: main_user.id)

BoardMembership.create!(board_id: board.id, user_id: main_user.id, username: "Kevboard1")
BoardMembership.create!(board_id: board2.id, user_id: main_user.id, username: "T2")

list = board.lists.create!(title: "Components")
card_one = list.cards.create!(title: "Presentational vs. Container")
names = %w{danny vicky julie}

names.each do |name|
  user = User.create!(email: "#{name}@gmail.com", password: "123pass")
  invite = Invite.create!(user_id: main_user.id, board_id: board.id, recipient_email: user.email, status: :accepted)
  BoardMembership.create!(board_id: board.id, user_id: user.id, username: name, invite_id: invite.id)
  card_one.comments.create!(user_id: user.id, description: "Neither")
end
