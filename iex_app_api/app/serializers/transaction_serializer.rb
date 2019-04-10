class TransactionSerializer < ActiveModel::Serializer
  
  attributes :id, :status, :action_date, :ticker, :action_amount, :action_price, :currency

end
