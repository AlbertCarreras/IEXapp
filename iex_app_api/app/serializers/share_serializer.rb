class ShareSerializer < ActiveModel::Serializer
  
  attributes :id, :name, :ticker, :buy_amount, :buy_date

end
