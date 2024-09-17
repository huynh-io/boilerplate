# frozen_string_literal: true

module Api
  module V1
    class SuppliersController < ApplicationController
      def index
        @pagy, @suppliers = pagy(Supplier.all)
        render :index, status: :ok
      end
    end
  end
end
