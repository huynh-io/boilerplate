# frozen_string_literal: true

module Suppliers
  class Searcher < ApplicationService
    attr_accessor :query

    def initialize(query: nil)
      @query = query
    end

    # TODO: dumb query for now. This acts as the entry point for more sophisticated query via:
    # - pg_search
    # - elasticsearch
    # - querykick
    # - etc.
    def call
      return Supplier.all if query.nil?

      Supplier.where('name ILIKE ?', "%#{query}%")
    end
  end
end
