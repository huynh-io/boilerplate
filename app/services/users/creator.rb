# frozen_string_literal: true

module Users
  class Creator < ApplicationService
    attr_accessor :email, :custom_metadata

    def initialize(params:)
      params = params.to_h.with_indifferent_access

      @email = params[:email]
      @custom_metadata = params[:custom_metadata]
    end

    def call
      User.create!(
        email:,
        custom_metadata:
      )
    end
  end
end
