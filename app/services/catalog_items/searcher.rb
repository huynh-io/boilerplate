# frozen_string_literal: true

module CatalogItems
  class Searcher < ApplicationService
    # TODO: dumb query for now. This acts as the entry point for more sophisticated query via:
    # - pg_search
    # - elasticsearch
    # - querykick
    # - etc.
    def call
      # TODO: Implement search query against item_data
      CatalogItem.all
    end
  end
end
