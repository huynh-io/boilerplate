# frozen_string_literal: true

module Suppliers
  class Creator < ApplicationService
    attr_accessor :params

    # init
    def initialize(params:)
      @params = params.with_indifferent_access
    end

    def call
      Supplier.create!(params)
    end
  end
end
