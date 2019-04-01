class UserSerializer < ActiveModel::Serializer
  
  attributes :email, :username

  has_many :shares
  
end
