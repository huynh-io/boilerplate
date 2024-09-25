# frozen_string_literal: true

module Users
  class Creator < ApplicationService
    attr_accessor :params

    def initialize(params:)
      @params = params.to_h.with_indifferent_access
    end

    def call
      puts params
      # User.create!(
      #   email:,
      #   custom_metadata:
      # )
    end
  end
end
