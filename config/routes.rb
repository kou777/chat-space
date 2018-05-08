Rails.application.routes.draw do
  get 'users/edit'

  get 'users/update'

  devise_for :users
  root 'messages#index'
  resources :users, only: [:edit, :update]
end
