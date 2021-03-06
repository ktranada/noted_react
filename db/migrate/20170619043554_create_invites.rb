class CreateInvites < ActiveRecord::Migration[5.0]
  def change
    create_table :invites do |t|
      t.integer :user_id, null: false
      t.integer :board_id, null: false
      t.string :email, null: false
      t.string :code, null: false
      t.integer :status, default: 0

      t.timestamps
    end

    add_index :invites, :user_id
    add_index :invites, :board_id
    add_index :invites, [:board_id, :email], unique: true
    add_index :invites, :email
  end
end
