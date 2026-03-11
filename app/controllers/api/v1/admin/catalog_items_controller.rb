# frozen_string_literal: true

module Api
  module V1
    module Admin
      class CatalogItemsController < ApplicationController
        def index
          scope = CatalogItems::Searcher.call(query: index_params[:query])
          @pagy, @catalog_items = pagy(:offset, scope)

          render :index, status: :ok
        end

        def show
          @catalog_item = CatalogItem.find(show_params[:id])

          render :show, status: :ok
        end

        # TODO:
        # - move this action specifically under admin namespace
        # - Make it a protected action that only the user with the right permissions can access
        # - Add the notion of an admin
        # def create
        #   @catalog_item = CatalogItems::Creator.call(params: create_params)

        #   render :show, status: :ok
        # end

        private

        def show_params
          params.permit(:id)
        end

        # def create_params
        #   params.permit(:supplier_id, item_data: [:name])
        # end
      end
    end
  end
end
