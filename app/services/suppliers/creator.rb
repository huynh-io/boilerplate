# frozen_string_literal: true

module Suppliers
  class Creator < ApplicationService
    attr_accessor :params, :address_params

    def initialize(params:)
      params = params.with_indifferent_access
      @address_params = params[:address]
      @params = params.except!(:address)
    end

    def call
      supplier = Supplier.create!(params)

      if address_params
        address_params[:addressable] = supplier
        Addresses::Creator.call(params: address_params)
      end

      supplier
    end
  end
end
