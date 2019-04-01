class Api::V1::SessionsController < ApplicationController
    before_action :authenticate_user,  only: [:auth]
   
    # Create a new user using the strong params.
    def create
      
      user = User.new(user_params)

      if user.save

        render json: {status: 200, msg: 'User was created.'}

      else 
        render json: {
          errors: user.errors.full_messages
        }, status: :unprocessable_entity

      end

    end
    
    # If authorized, return the logged-in user information based on different conditionals:
    # user has profile image and previous geolocation coordinates. 
    def auth

            @user = current_user
            render json: @user
          
    end
   
    private
   
    def user_params
      params.require(:user).permit(:user_id, :username, :email, :password, :password_confirmation)
    end

    def authorize
      return_unauthorized unless current_user && current_user.can_modify_user?(params[:id])
    end
end
  