# frozen_string_literal: true

module CatalogItems
  class Creator < ApplicationService
    attr_accessor :params

    def initialize(params:)
      @params = params.to_h.with_indifferent_access
    end

    def call
      # TODO: Implement item data parsing & enforcement
      CatalogItem.create!(params)
    end
  end
end
