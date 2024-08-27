# frozen_string_literal: true

namespace :deploy do
  desc 'Deploy app to Heroku'

  # APP_NAME=your-app-name rake deploy:production
  # APP_NAME=your-app-name rake deploy:staging
  #
  # Ensure your git remote are named heroku-staging and heroku-production
  #
  # e.g.
  #
  # heroku-production       https://git.heroku.com/heybrowow-production.git (fetch)
  # heroku-production       https://git.heroku.com/heybrowow-production.git (push)
  task production: :environment do
    Rake::Task['deploy:to_environment'].invoke(:production)
  end

  task staging: :environment do
    Rake::Task['deploy:to_environment'].invoke(:staging)
  end

  task :to_environment, [:environment] => :environment do |_t, params|
    environment = params[:environment]

    time = Time.current
    puts("Deploying to #{environment} 🛫")

    `git push heroku-#{environment} main`
    `heroku run rake db:migrate --app #{ENV.fetch('APP_NAME', nil)}-#{environment}`

    minutes, seconds = (Time.current - time).to_i.divmod(60)
    puts("Completed deploy to #{environment} in #{minutes}:#{seconds} 🛬")
  end
end
