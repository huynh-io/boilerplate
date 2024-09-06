# frozen_string_literal: true

module Suppliers
  class Creator < ApplicationService
    attr_accessor :name

    # init
    def initialize(params:)
      params = params.with_indifferent_access

      @name = params[:name]
    end

    def call
      Supplier.create!(name:)
    end
  end
end
