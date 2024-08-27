# frozen_string_literal: true

Rails.application.routes.draw do
  root 'application#index'
  # Rails matches routes from top to bottom. Everything that doesn't hit an API route above will defer to React Router.
  get '*path', to: 'application#index'

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check
end
