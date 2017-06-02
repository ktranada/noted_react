# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# rake db:reset => rake db:drop db:create db:migrate db:seed

user = User.create!(email: "kev@gmail.com", password: "123pass")
board = user.boards.create!(title: "React")
board2 = user.boards.create!(title: "Redux")
list = board.lists.create!(title: "Components")
card_one = list.cards.create!(title: "Presentational vs. Container")
names = %w{danny vicky julie}

names.each do |name|
  user = User.create(email: "#{name}@gmail.com", password: "123pass")
  CardAssignment.create(user_id: user.id, card_id: card_one.id)
  card_one.comments.create!(user_id: user.id, description: "Neither")
end
