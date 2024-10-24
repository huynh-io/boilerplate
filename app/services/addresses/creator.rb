# frozen_string_literal: true

module Addresses
  class Creator < ApplicationService
    attr_accessor :params

    def initialize(params:)
      @params = params.with_indifferent_access
    end

    def call
      Address.create!(params)
    end
  end
end
