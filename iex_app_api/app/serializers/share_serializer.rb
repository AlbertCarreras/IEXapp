class ShareSerializer < ActiveModel::Serializer
  
  attributes :buy_date, :ticker, :buy_amount, :buy_currency

end
