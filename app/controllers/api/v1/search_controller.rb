# frozen_string_literal: true

module Api
  module V1
    class SearchController < ApplicationController
      def index
        scope = Searcher.call(query: index_params[:query])
        @pagy, @catalog_items = pagy(scope)

        render :index, status: :ok
      end
    end
  end
end
