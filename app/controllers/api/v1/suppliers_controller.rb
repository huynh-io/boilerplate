# frozen_string_literal: true

module Api
  module V1
    class SuppliersController < ApplicationController
      def index
        scope = Suppliers::Searcher.call(query: index_params[:query])
        @pagy, @suppliers = pagy(scope)

        render :index, status: :ok
      end

      def create
        @supplier = Suppliers::Creator.call(params: supplier_create_params)

        # TODO: render
      end

      private

      def index_params
        params.permit(:page, :query)
      end

      def supplier_create_params
        params.permit(:name, :email, :phone_number)
      end
    end
  end
end
