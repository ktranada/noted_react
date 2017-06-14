class AddUsernameToBoardMemberships < ActiveRecord::Migration[5.0]
  def change
    add_column :board_memberships, :username, :string, null: false, unique: true
  end
end
