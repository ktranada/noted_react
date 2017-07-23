# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# rake db:reset => rake db:drop db:create db:migrate db:seed
User.destroy_all

users = []
main_user = User.create!(email: "admin@noted.pw", password: "123pass", timezone: "America/Los_Angeles")
users << main_user

board = Board.create!(title: "React", user_id: main_user.id)
board.create_owner_membership("admin")
board2 = Board.create!(title: "Redux", user_id: main_user.id)
board2.create_owner_membership("admin")

list = board.lists.create!(title: "Components")
card_one = list.cards.create!(title: "Presentational vs. Container")
names = %w{danny vicky julie guest}

channel_one = board.channels[0]
channel_two = board2.channels[0]

names.each do |name|
  user = User.create!(email: "#{name}@noted.pw", password: "123pass", timezone: "America/Los_Angeles")
  users << user
  invite = Invite.create!(user_id: main_user.id, board_id: board.id, email: user.email, status: :accepted)
  BoardMembership.create!(board_id: board.id, user_id: user.id, username: name, invite_id: invite.id)

  invite_two = Invite.create!(user_id: main_user.id, board_id: board2.id, email: user.email, status: :accepted)
  BoardMembership.create!(board_id: board2.id, user_id: user.id, username: name, invite_id: invite_two.id)
  card_one.comments.create!(user_id: user.id, description: Faker::StarWars.quote)
end

quotes = [Faker::HitchhikersGuideToTheGalaxy, Faker::HarryPotter, Faker::StarWars]

today = Date.today

(0...50).each do |n|
  user = users[rand(4)]
  messageCount = rand(6)
  date = today - n
  (0...messageCount).each do |n|
    quote = quotes[rand(3)].quote
    channel_one.messages.create!(author_id: user.id, content: quote, created_at: date, updated_at: date)
  end
end
