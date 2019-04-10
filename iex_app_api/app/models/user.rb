class User < ApplicationRecord

  has_many :shares
  has_many :transactions

  # Necessary to authenticate.
  has_secure_password
  
  # Basic password validation, configure to your liking.
  validates_length_of :password, maximum: 72, minimum: 8, allow_nil: true, allow_blank: false
  validates_confirmation_of :password, allow_nil: true, allow_blank: false
  before_validation {
    (self.email = self.email.to_s.downcase) && (self.username = self.username.to_s.downcase)
  }

  # Make sure email and username are present and unique.
  validates_presence_of :email
  validates_uniqueness_of :email
  validates_presence_of :username

end
