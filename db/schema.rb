# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170713221115) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "board_memberships", force: :cascade do |t|
    t.integer  "user_id",                null: false
    t.integer  "board_id",               null: false
    t.integer  "invite_id",              null: false
    t.integer  "status",     default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "username",               null: false
    t.index ["board_id", "invite_id"], name: "index_board_memberships_on_board_id_and_invite_id", unique: true, using: :btree
    t.index ["invite_id"], name: "index_board_memberships_on_invite_id", using: :btree
  end

  create_table "boards", force: :cascade do |t|
    t.integer  "user_id",                null: false
    t.string   "title",                  null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "position",   default: 0, null: false
    t.index ["user_id"], name: "index_boards_on_user_id", using: :btree
  end

  create_table "card_assignments", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "card_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "card_id"], name: "index_card_assignments_on_user_id_and_card_id", unique: true, using: :btree
  end

  create_table "cards", force: :cascade do |t|
    t.integer  "list_id",                  null: false
    t.string   "title",                    null: false
    t.integer  "position"
    t.text     "description", default: ""
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.index ["list_id"], name: "index_cards_on_list_id", using: :btree
  end

  create_table "channels", force: :cascade do |t|
    t.integer  "board_id",               null: false
    t.string   "title",                  null: false
    t.integer  "permission", default: 0, null: false
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["board_id"], name: "index_channels_on_board_id", using: :btree
    t.index ["title"], name: "index_channels_on_title", using: :btree
  end

  create_table "comments", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "card_id",     null: false
    t.text     "description", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["user_id", "card_id"], name: "index_comments_on_user_id_and_card_id", using: :btree
  end

  create_table "invites", force: :cascade do |t|
    t.integer  "user_id",                null: false
    t.integer  "board_id",               null: false
    t.string   "email",                  null: false
    t.string   "code",                   null: false
    t.integer  "status",     default: 0
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.index ["board_id", "email"], name: "index_invites_on_board_id_and_email", unique: true, using: :btree
    t.index ["board_id"], name: "index_invites_on_board_id", using: :btree
    t.index ["email"], name: "index_invites_on_email", using: :btree
    t.index ["user_id"], name: "index_invites_on_user_id", using: :btree
  end

  create_table "lists", force: :cascade do |t|
    t.string   "title",      null: false
    t.integer  "position"
    t.integer  "board_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_lists_on_board_id", using: :btree
  end

  create_table "messages", force: :cascade do |t|
    t.integer  "author_id",  null: false
    t.integer  "channel_id", null: false
    t.text     "content",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_messages_on_author_id", using: :btree
    t.index ["channel_id"], name: "index_messages_on_channel_id", using: :btree
  end

  create_table "subscriptions", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.integer  "channel_id", null: false
    t.integer  "board_id",   null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["board_id"], name: "index_subscriptions_on_board_id", using: :btree
    t.index ["channel_id", "user_id"], name: "index_subscriptions_on_channel_id_and_user_id", unique: true, using: :btree
    t.index ["channel_id"], name: "index_subscriptions_on_channel_id", using: :btree
    t.index ["user_id"], name: "index_subscriptions_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "timezone",        null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  end

end
