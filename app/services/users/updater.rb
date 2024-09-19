# frozen_string_literal: true

module Users
  class Updater < ApplicationService
    attr_accessor :email, :refresh_token, :custom_metadata, :email_verified

    def initialize(params:)
      params = params.with_indifferent_access

      @id = params[:id]
      @email = params[:email]
      @refresh_token = params[:refresh_token]
      @custom_metadata = params[:custom_metadata]
      @email_verified = !!params[:email_verified]
    end

    def call
      user = User.find(@id)
      user.update!(
        email:,
        refresh_token:,
        custom_metadata:,
        email_verified:
      )
    end
  end
end
