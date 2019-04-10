class UserSerializer < ActiveModel::Serializer
  
  attributes :id, :email, :username, :balance

  has_many :shares, :transactions  
end
