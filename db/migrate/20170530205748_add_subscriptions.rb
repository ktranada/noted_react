class AddSubscriptions < ActiveRecord::Migration[5.0]
  def change
    create_table :subscriptions do |t|
      t.integer :user_id, null: false
      t.integer :conversation_id, null: false
    end

    add_index :subscriptions, [:conversation_id, :user_id], unique: true
    add_index :subscriptions, :user_id
    add_index :subscriptions, :conversation_id
  end
end
