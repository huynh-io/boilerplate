# frozen_string_literal: true

module Api
  module V1
    class SuppliersController < ApplicationController
      def index
        scope = Suppliers::Searcher.call(query: index_params[:query])
        @pagy, @suppliers = pagy(scope)

        render :index, status: :ok
      end

      private

      def index_params
        params.permit(:page, :query)
      end
    end
  end
end
