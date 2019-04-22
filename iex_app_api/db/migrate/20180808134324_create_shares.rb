class CreateShares < ActiveRecord::Migration[5.2]
  def change
    create_table :shares do |t|
      t.integer :user_id
      t.string :ticker
      t.integer :buy_amount
      t.date :buy_date
      t.string :buy_currency
      t.timestamps
    end
  end
end
