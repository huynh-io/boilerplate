# frozen_string_literal: true

module Users
  class Updater < ApplicationService
    attr_accessor :email, :refresh_token, :custom_metadata, :email_verified

    # init
    def initialize(params:)
      params = params.with_indifferent_access if params.present?

      # this uuid should already exist and it should
      # also be validated such that the request to update
      # a User record is authorized to do so. - corey
      @id = params[:id]
      @email = params[:email]
      @refresh_token = params[:refresh_token]
      @custom_metadata = params[:custom_metadata]
      @email_verified = params[:email_verified]
    end

    def call
      # probably not the right way, should validate from token or
      # something to prevent spoofing. IDK - corey

      puts 'uuid is ' + @id
      user = User.find_by(id: @id)

      # handle case for nonexistent uuid?
      raise ActiveRecord::RecordNotFound, 'User not found' unless user

      # what if user changes email, we should probably force user to update first...
      # problem for much much later. - corey
      user.update!(
        email:,
        refresh_token:,
        custom_metadata:,
        email_verified:
      )
    end
  end
end
