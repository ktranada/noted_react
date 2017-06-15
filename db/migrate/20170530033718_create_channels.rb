class CreateChannels < ActiveRecord::Migration[5.0]
  def change
    create_table :channels do |t|
      t.integer :board_id, null: false
      t.string :title, null: false
      t.integer :permission, null: false, default: 0

      t.timestamps
    end

    add_index :channels, :title
    add_index :channels, :board_id
  end
end
