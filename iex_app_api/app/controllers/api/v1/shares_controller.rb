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

    if  @leftBalance >= 0

        @new_share = current_user.shares.build(ticker: @ticker,
        buy_amount: @amount,
        buy_date: Time.now,
        buy_price: @price,
        buy_currency: "USD")

        @user = current_user
        @user.balance = @leftBalance
        @user.save
        
      render json: {
        share: {
          id: @new_share.id,
          buy_date: @new_share.buy_date,
          ticker: @new_share.ticker,
          buy_amount: @new_share.buy_amount,
          buy_price: @new_share.buy_price
          buy_currency: @new_share.buy_currency,
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

        @user = current_user

        @user.balance = @user.balance + @totalGain
        
        @user.save
        
        @share.delete

        render json: {
          shares: @user.shares,
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
  