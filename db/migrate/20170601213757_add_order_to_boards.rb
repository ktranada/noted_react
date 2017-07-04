class AddOrderToBoards < ActiveRecord::Migration[5.0]
  def change
    add_column :boards, :position, :integer, null: false, default: 0
  end
end
