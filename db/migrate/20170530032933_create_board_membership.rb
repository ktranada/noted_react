class CreateBoardMembership < ActiveRecord::Migration[5.0]
  def change
    create_table :board_memberships do |t|
      t.integer  "user_id",    null: false
      t.integer  "board_id",   null: false

      t.timestamps
    end

    add_index :board_memberships, [:board_id, :user_id], unique: true
  end
end
