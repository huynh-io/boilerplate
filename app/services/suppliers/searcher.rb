# frozen_string_literal: true

module Suppliers
  class Searcher < ApplicationService
    attr_accessor :search

    def initialize(search: nil)
      @search = search
    end

    # TODO: dumb search for now. This acts as the entry point for more sophisticated search via:
    # - pg_search
    # - elasticsearch
    # - searchkick
    # - etc.
    def call
      return Supplier.all if search.nil?

      Supplier.where('name ILIKE ?', "%#{search}%")
    end
  end
end
