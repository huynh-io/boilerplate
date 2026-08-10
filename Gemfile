# frozen_string_literal: true

source 'https://rubygems.org'

ruby '3.4.8'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem 'rails', '~> 8.1.0'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.6'
# Use the Puma web server [https://github.com/puma/puma]
gem 'puma', '~> 8.0'
# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem 'jbuilder'
# Use Redis adapter to run Action Cable in production
gem 'redis', '~> 5.4'
# Sidekiq to execute background jobs
gem 'sidekiq', '~> 8.1'
# Ensure migrations are safe to run in production
gem 'strong_migrations', '~> 2.8'

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
gem 'bcrypt', '~> 3.1.7'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[windows jruby]

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin Ajax possible
gem 'rack-cors'

# Authentication
gem 'devise'
gem 'devise-jwt'

# Vite integration for serving the frontend SPA
gem 'vite_rails'

# Pagination
gem 'pagy', '~> 43.5'

# Need explicit dependency
gem 'csv', '~> 3.3'

# Use for development, testing, and production seed data
gem 'faker', '~> 3.8'

# Authorization
gem 'pundit', '~> 2.5'

group :development, :test do
  # Annotation of models database schema (Rails 8 compatible replacement for annotate)
  gem 'annotaterb'

  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[mri windows], require: 'debug/prelude'

  gem 'dotenv-rails', '~> 3.2'

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem 'brakeman', require: false

  # Spec fixture data
  gem 'factory_bot_rails'

  # Use Pry for debugging
  gem 'pry-rails'

  # Omakase Ruby styling [https://github.com/rails/rubocop-rails-omakase/]
  gem 'rubocop', '~> 1.89'
  gem 'rubocop-factory_bot', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
  gem 'rubocop-rspec_rails', require: false

  gem 'rspec-rails'
end
