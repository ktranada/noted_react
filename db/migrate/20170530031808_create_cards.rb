class CreateCards < ActiveRecord::Migration[5.0]
  def change
    create_table :cards do |t|
      t.integer :list_id, null: false
      t.string :title, null: false
      t.integer :ord, default: 0
      t.text :description

      t.timestamps
    end

    add_index :cards, :list_id
  end
end
