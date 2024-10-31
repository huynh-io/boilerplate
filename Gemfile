# frozen_string_literal: true

source 'https://rubygems.org'

ruby '3.3.5'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem 'rails', '~> 7.2.2'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.5'
# Use the Puma web server [https://github.com/puma/puma]
gem 'puma', '>= 5.0'
# Build JSON APIs with ease [https://github.com/rails/jbuilder]
gem 'jbuilder'
# Use Redis adapter to run Action Cable in production
gem 'redis', '>= 4.0.1'
# Sidekiq to execute background jobs
gem 'sidekiq', '>= 4.0.1'
# Ensure migrations are safe to run in production
gem 'strong_migrations', '~> 2.0'

# Use Kredis to get higher-level data types in Redis [https://github.com/rails/kredis]
# gem "kredis"

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
# gem "bcrypt", "~> 3.1.7"

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[windows jruby]

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
# gem "image_processing", "~> 1.2"

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin Ajax possible
gem 'rack-cors'

# Use the Firebase ID Token gem to verify Firebase ID tokens
gem 'firebase_id_token', '~> 3.0'

# Pagination
gem 'pagy', '~> 9.1'

# Need explicit dependency
gem 'csv', '~> 3.3'

# Use for development, testing, and production seed data
gem 'faker', '~> 3.5'

# Authorization
gem 'pundit', '~> 2.4'

group :development, :test do
  # Annotation of models database schema
  gem 'annotate', '~> 3.2'

  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[mri windows], require: 'debug/prelude'

  gem 'dotenv-rails', '~> 3.1'

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem 'brakeman', require: false

  # Spec fixture data
  gem 'factory_bot_rails'

  # Use Pry for debugging
  gem 'pry-rails', '~> 0.3.11'

  # Omakase Ruby styling [https://github.com/rails/rubocop-rails-omakase/]
  gem 'rubocop', '~> 1.67'
  gem 'rubocop-factory_bot', require: false
  gem 'rubocop-rails', require: false
  gem 'rubocop-rspec', require: false
  gem 'rubocop-rspec_rails', require: false

  gem 'rspec-rails'
end
