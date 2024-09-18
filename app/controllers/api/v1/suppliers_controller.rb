# frozen_string_literal: true

module Api
  module V1
    class SuppliersController < ApplicationController
      def index
        scope = Suppliers::Searcher.call(index_params[:search])
        @pagy, @suppliers = pagy(scope)

        render :index, status: :ok
      end

      private

      def index_params
        params.permit(:page, :search)
      end
    end
  end
end
