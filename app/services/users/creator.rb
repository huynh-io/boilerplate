# frozen_string_literal: true

module Users
  class Creator < ApplicationService
    attr_accessor :email, :refresh_token, :custom_metadata, :email_verified

    # init
    def initialize(params:)
      params = params.with_indifferent_access

      @email = params[:email]
      @refresh_token = params[:refresh_token]
      @custom_metadata = params[:custom_metadata]
      @email_verified = params[:email_verified]
    end

    def call
      User.create!(
        email:,
        refresh_token:,
        custom_metadata:,
        email_verified:
      )
    end
  end
end
