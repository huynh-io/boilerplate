# frozen_string_literal: true

module Suppliers
  class Updater < ApplicationService
    attr_accessor :supplier, :params, :address_params

    def initialize(params:)
      params = params.with_indifferent_access
      @supplier = Supplier.find(params[:id])
      @address_params = params[:address]
      @params = params.except!(:address, :id)
    end

    def call
      supplier.update!(params)

      if address_params
        address_params[:addressable] = supplier
        Addresses::Updater.call(params: address_params)
      end

      supplier
    end
  end
end
