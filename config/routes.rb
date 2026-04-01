# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users, path: 'api/v1',
                     path_names: { sign_in: 'sign_in', sign_out: 'sign_out', registration: 'sign_up' },
                     controllers: { sessions: 'users/sessions', registrations: 'users/registrations' }

  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      get :search, to: 'search#index'

      get 'users/me', to: 'users#me'

      namespace :admin do
        resources :catalog_items, only: %i[index show]
        resources :suppliers, only: %i[index show create update]
        resources :users, only: %i[index show]
      end
    end
  end

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # SPA catch-all: serve the React app for any HTML request that doesn't match an API route
  root 'pages#index'
  get '*path', to: 'pages#index', constraints: ->(req) { !req.xhr? && req.format.html? }
end
