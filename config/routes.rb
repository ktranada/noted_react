Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show]
    resource :session, only: [:create, :destroy]
    resources :lists, only: [:create, :destroy]
    resources :cards, only: [:create, :destroy, :update]
    resources :comments, only: [:create, :destroy, :update]
    resources :invites, only: [:create, :destroy]
    resources :boards, only: [:create, :show, :update, :destroy]
    resources :board_memberships, only: [:destroy, :update]
  end
end
