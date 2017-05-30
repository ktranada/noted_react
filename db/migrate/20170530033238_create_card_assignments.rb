class CreateCardAssignments < ActiveRecord::Migration[5.0]
  def change
    create_table :card_assignments do |t|
      t.integer :user_id, null: false
      t.integer :card_id, null: false

      t.timestamps
    end

    add_index :card_assignments, [:user_id, :card_id], unique: true
  end
end
