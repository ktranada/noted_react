class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.integer :author_id, null: false
      t.integer :channel_id, null: false
      t.string :socket_id, null: false, default: ""
      t.text :content, null: false

      t.timestamps
    end

    add_index :messages, :author_id
    add_index :messages, :channel_id
  end
end
