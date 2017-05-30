class CreateConversations < ActiveRecord::Migration[5.0]
  def change
    create_table :conversations do |t|
      t.integer :user_id, null: false
      t.integer :board_id, null: false
      t.string :title, null: false
      t.integer :permission, null: false, default: 0

      t.timestamps
    end

    add_index :conversations, :title
    add_index :conversations, :user_id
  end
end
