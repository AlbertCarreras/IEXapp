class AddBalanceToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :balance, :decimal, precision: 10, scale: 2, null: false, default: '5000.00'

  end
end
