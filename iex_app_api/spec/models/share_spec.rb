require 'rails_helper'

RSpec.describe Share, :type => :model do

  before(:each) { @share = Share.new }

  it 'has a user_id field' do
    expect(@share).to respond_to(:user_id)
  end

  it 'has a ticker field' do
    expect(@share).to respond_to(:ticker)
  end

  it 'has a buy_amount field' do
    expect(@share).to respond_to(:buy_amount)
  end

  it 'has a buy_date field' do
    expect(@share).to respond_to(:buy_date)
  end

  it 'has a buy_price field' do
    expect(@share).to respond_to(:buy_price)
  end

  it 'has a buy_currency field' do
    expect(@share).to respond_to(:buy_currency)
  end

end
