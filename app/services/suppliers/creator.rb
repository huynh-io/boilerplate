# frozen_string_literal: true

module Suppliers
  class Creator < ApplicationService
    attr_accessor :params

    def initialize(params:)
      @params = params.to_h.with_indifferent_access

      # TODO: validate
      @email = params[:email].to_s
      @phone = params[:phone].to_s
      @name = params[:name].to_s
    end

    def call
      Supplier.create!(
        # HELP - why can't I omit the variable names here?
        name: @name,
        phone: @phone,
        email: @email
      )
    end
  end
end
