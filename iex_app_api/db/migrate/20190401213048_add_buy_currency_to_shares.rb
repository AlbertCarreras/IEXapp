class AddBuyCurrencyToShares < ActiveRecord::Migration[5.2]
  def change
    add_column :shares, :buy_currency, :string
  end
end
