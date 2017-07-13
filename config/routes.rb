Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  mount ActionCable.server => '/cable'

  root to: "static_pages#root"
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show, :update, :destroy]
    resource :session, only: [:create, :destroy]
    resources :lists, only: [:create] do
      collection do
        put :update
      end
    end

    resources :channels, only: [:create] do
      resources :messages, only: [:index]
    end
    resources :cards, only: [:create, :destroy, :update]
    resources :comments, only: [:create, :destroy, :update]
    resources :invites, only: [ :show, :create, :update, :destroy]
    resources :boards, only: [:create, :show, :update, :destroy]
    resources :board_memberships, only: [:destroy, :update]
    resources :subscriptions, only: [:index]
  end
end
