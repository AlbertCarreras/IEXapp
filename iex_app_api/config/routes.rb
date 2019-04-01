Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      #Page setup
      post '/interests' => 'interests#index'
      post '/interests/create' => 'interests#create' 
      
      # User no-action data
      get '/user/auth' => 'sessions#auth'
      post '/users/create' => 'sessions#create'
      post 'user_token' => 'user_token#create' # Get login token from Knock

      # User action data
      post '/user/:id/interests' => 'user_interests#create'
      delete '/user_interests/:id' => 'user_interests#destroy'
      
    end
  end
  
end


