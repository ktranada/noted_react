Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  mount ActionCable.server => '/cable'

  root to: "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update, :destroy]
    resource :session, only: [:create, :destroy]

    resources :boards, only: [:create, :show, :update, :destroy] do
      resources :lists, only: [:create, :index, :update]
      resources :cards, only: [:create, :destroy, :update]
      resources :comments, only: [:create, :destroy, :update]
      resources :board_memberships, only: [:destroy, :update]
      resources :invites, only: [:create, :destroy]
      resources :channels, only: [:create] do
        resources :messages, only: [:create, :index]
      end
      resources :messages, only: [:create]
    end

    resources :invites, only: [ :show, :update]
    resources :subscriptions, only: [:index]
    resources :timezones, only: [:index]
  end
end
