class UserSerializer < ActiveModel::Serializer
  
  attributes :email, :username, :balance

  has_many :shares
  
end
