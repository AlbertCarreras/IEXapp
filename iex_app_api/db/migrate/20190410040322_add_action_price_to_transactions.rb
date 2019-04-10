class AddActionPriceToTransactions < ActiveRecord::Migration[5.2]
  def change
    add_column :transactions, :action_price, :decimal, precision: 10, scale: 2
  end
end
