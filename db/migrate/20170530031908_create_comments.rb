class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.integer :user_id, null: false
      t.integer :card_id, null: false
      t.text :description, null: false

      t.timestamps
    end
    add_index :comments, [:user_id, :card_id]
  end
end
