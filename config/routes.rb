# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      get :search, to: 'search#index'

      resources :users, only: %i[create] do
        get :me, on: :collection
      end

      namespace :admin do
        resources :catalog_items, only: %i[index show]
        resources :suppliers
      end
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check
end
