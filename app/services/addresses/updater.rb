# frozen_string_literal: true

module Addresses
  class Updater < ApplicationService
    attr_accessor :params, :addressable

    def initialize(params:)
      @params = params.with_indifferent_access
      @addressable = @params[:addressable]
    end

    def call
      if addressable&.address
        addressable.address.update!(params.except(:addressable))
      else
        Addresses::Creator.call(params:)
      end
    end
  end
end
