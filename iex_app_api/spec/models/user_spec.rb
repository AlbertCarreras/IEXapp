require 'rails_helper'

RSpec.describe Share, :type => :model do

  before(:each) { @user = User.new(email: 'user@example.com') }

  subject { @user }

  it 'has a password field' do
    expect(@user).to respond_to(:password)
  end

  it 'has a name field' do
    expect(@user).to respond_to(:name)
  end

  it 'has a password confirmation field' do
    expect(@user).to respond_to(:password_confirmation)
  end
  
  it 'is valid if password and password_confirmation match' do
      @user.password = @user.password_confirmation = 'foo'
      expect(@user.valid?).to be true    
  end
  
  it 'is invalid if password is set and password_confirmation is nil' do
    @user.password = 'foo'
       expect(@user.valid?).to be false 
  end
  
  it "is invalid if password and password_confirmation are both non-nil and don't match" do
    @user.password = 'foo'
    @user.password_confirmation = 'fo0'
      expect(@user.valid?).to be false
  end
  

end
