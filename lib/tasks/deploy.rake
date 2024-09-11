# frozen_string_literal: true

namespace :deploy do # rubocop:disable Metrics/BlockLength
  desc 'Deploy app to Heroku'

  task build_assets: :environment do
    puts('Cleaning up public directory 🧹')
    `rm -rf public`

    puts('Building assets 🏗')
    `cd frontend && npm run build`

    puts('Moving assets to public directory 🚚')
    `mv frontend/build public`
  end

  # APP_NAME=your-app-name rake deploy:production
  # APP_NAME=your-app-name rake deploy:staging
  #
  # Ensure your git remote are named heroku-staging and heroku-production
  #
  # e.g.
  #
  # boilerplate-production       https://git.heroku.com/boilerplate-production.git (fetch)
  # boilerplate-production       https://git.heroku.com/boilerplate-production.git (push)
  task production: :environment do
    Rake::Task['deploy:to_environment'].invoke(:production)
  end

  task staging: :environment do
    Rake::Task['deploy:to_environment'].invoke(:staging)
  end

  task :to_environment, [:environment] => :environment do |_t, params|
    app_name = ENV.fetch('APP_NAME', nil)
    environment = params[:environment]
    full_app_name = "#{app_name}-#{environment}"

    time = Time.current
    puts("Deploying to #{full_app_name} 🛫")

    `git push #{full_app_name} main`
    `heroku run rake db:migrate --app #{full_app_name}`

    minutes, seconds = (Time.current - time).to_i.divmod(60)
    puts("Completed deploy to #{environment} in #{minutes}:#{seconds} 🛬")
  end
end
