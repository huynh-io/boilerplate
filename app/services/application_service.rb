# frozen_string_literal: true

# app/services/application_service.rb
class ApplicationService
  def self.call(**args)
    new(**args).call
  end
end
