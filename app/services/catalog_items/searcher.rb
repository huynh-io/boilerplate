# frozen_string_literal: true

module CatalogItems
  class Searcher < ApplicationService
    attr_accessor :query

    def initialize(query: nil)
      @query = query
    end

    def call
      return CatalogItem.all if query.nil?

      CatalogItem.where('item_data ->> :key ILIKE :value', key: :name, value: "%#{query}%")
    end
  end
end
