class AddBuyPriceToShares < ActiveRecord::Migration[5.2]
  def change
    add_column :shares, :buy_price, :decimal, precision: 10, scale: 2
  end
end
