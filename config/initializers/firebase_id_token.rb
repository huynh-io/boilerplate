# frozen_string_literal: true

FirebaseIdToken.configure do |config|
  config.redis = Redis.new(
    {
      url: ENV.fetch('REDIS_URL', 'redis://localhost:6379/1'),
      ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE }
    }
  )
  config.project_ids = [ENV.fetch('FIREBASE_PROJECT_ID')]
end
