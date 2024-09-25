# frozen_string_literal: true

module Users
  class Creator < ApplicationService
    attr_accessor :params

    def initialize(params:)
      @params = params.to_h.with_indifferent_access
    end

    def call
      user = User.find_or_create_by!(email: params[:email])
      ensure_access_token!(user:)
      user
    end

    private

    def ensure_access_token!(user:)
      return if user.access_token.present?

      user.update!(access_token: SecureRandom.uuid)
    end
  end
end
