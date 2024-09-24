# frozen_string_literal: true

module Api
  module V1
    class CatalogItemsController < ApplicationController
      def index
        scope = CatalogItems::Searcher.call
        @pagy, @catalog_items = pagy(scope)

        render :index, status: :ok
      end

      def show
        @catalog_item = CatalogItem.find(show_params[:id])

        render :show, status: :ok
      end

      def create
        @catalog_item = CatalogItems::Creator.call(params: create_params)

        render :show, status: :ok
      end

      private

      def show_params
        params.permit(:id)
      end

      def create_params
        params.permit(:supplier_id, item_data: [:name])
      end

      def index_params
        params.permit(:page)
      end
    end
  end
end
