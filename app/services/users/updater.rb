# frozen_string_literal: true

module Users
  class Updater < ApplicationService
    attr_accessor :email, :custom_metadata

    def initialize(params:)
      params = params.with_indifferent_access

      @id = params[:id]
      @email = params[:email]
      @custom_metadata = params[:custom_metadata]
    end

    def call
      user = User.find(@id)
      user.update!(
        email:,
        custom_metadata:
      )
    end
  end
end
