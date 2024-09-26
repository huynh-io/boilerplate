# frozen_string_literal: true

class Searcher < ApplicationService
  attr_accessor :query

  def initialize(query: nil)
    @query = query
  end

  def call
    # Delegate search to CatalogItems::Search service for now.
    # In the future, this can search across multiple models.
    CatalogItems::Searcher.call(query:)
  end
end
