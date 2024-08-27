# frozen_string_literal: true

namespace :deploy do
  desc 'Deploy app to Heroku'

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
    `heroku run rake db:migrate --app #{environment}`

    minutes, seconds = (Time.current - time).to_i.divmod(60)
    puts("Completed deploy to #{environment} in #{minutes}:#{seconds} 🛬")
  end
end
