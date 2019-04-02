Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do

      # Signup
      post '/users' => 'sessions#create'

      # Login
      get '/users/auth' => 'sessions#auth'
      post '/users/user_token' => 'user_token#create' # Get login token from Knock

      # Shares
      post '/users/:id/shares' => 'shares#create'            
      delete '/users/:id/shares/:id' => 'shares#destroy'
      
    end
  end
  
end


