class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|

      t.integer :user_id
      t.string :ticker
      t.string :status, default: 'active'
      t.integer :action_amount
      t.date :action_date

      t.timestamps
    end
  end
end
