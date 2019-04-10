require 'rest-client'
require 'json'
require 'uri'

class Api::V1::SharesController < ApplicationController
  before_action :authenticate_user,  only: [:create, :destroy]
  
  def create

    @ticker = params["shares"]["ticker"]
    @amount = params["shares"]["amount"].to_i

    @availableBalance = current_user.balance
    
    @price = RestClient.get("https://api.iextrading.com/1.0//stock/#{ URI.escape(@ticker)}/price")

    @price = JSON.parse(@price)

    @price = BigDecimal.new(@price, 10)

    @totalPrice =  @price * @amount

    @leftBalance = @availableBalance - @totalPrice

    @buy_transaction = Transaction.create(user_id: current_user.id,
        ticker: @ticker,
        action_amount: @amount,
        action_date: Time.now,
        action_price: @price,
        currency: "USD")

    if  @leftBalance >= 0

        @new_share = current_user.shares.build(ticker: @ticker,
        buy_amount: @amount,
        buy_date: Time.now,
        buy_price: @price,
        buy_currency: "USD")

        @buy_transaction.save

        @user = current_user
        @user.balance = @leftBalance
        @user.save
        
      render json: {
        share: {
          id: @new_share.id,
          buy_date: @new_share.buy_date,
          ticker: @new_share.ticker,
          buy_amount: @new_share.buy_amount,
          buy_price: @new_share.buy_price,
          buy_currency: @new_share.buy_currency
        },
        transaction: {
          id:  @buy_transaction.id,
          status:  @buy_transaction.status,
          action_date:  @buy_transaction.action_date,
          ticker:  @buy_transaction.ticker,
          action_amount:  @buy_transaction.action_amount,
          action_price:  @buy_transaction.action_price,
          currency:  @buy_transaction.currency
        },
        balance: @user.balance
      } , status: 200

    else

      render json: { errors: 'The account does not have enough funds for the transaction.'}, status: 422
    end
    
  end
 
  def destroy

      @share = Share.find(params["id"])
      
      if @share.user_id == current_user.id

        @price = RestClient.get("https://api.iextrading.com/1.0//stock/#{ URI.escape(@share.ticker)}/price")

        @price = BigDecimal.new(@price, 10)

        @totalGain =  @price * @share.buy_amount

        @sold_transaction = Transaction.create(user_id: current_user.id,ticker: @share.ticker,
        status: "sold",
        action_amount: @share.buy_amount,
        action_date: Time.now,
        action_price: @price,
        currency: "USD")
        @sold_transaction.save

        @user = current_user

        @user.balance = @user.balance + @totalGain
        
        @user.save
        
        @share.delete

        render json: {
          shares: @user.shares,
          transactions: @user.transactions,
          balance: @user.balance
        } , status: 200

      else 

        render json: {
            error: "Unauthorized."
          } , status: 401
      end
      
  end

    private
    
    def authorize
      return_unauthorized unless current_user && current_user.can_modify_user?(params[:id])
    end
end
  