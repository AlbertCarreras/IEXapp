class ShareSerializer < ActiveModel::Serializer
  
  attributes :id, :buy_date, :ticker, :buy_amount, :buy_price, :buy_currency

end
