# frozen_string_literal: true

module Api
  module V1
    module Admin
      class SuppliersController < AuthorizedController
        def index
          scope = Suppliers::Searcher.call(query: index_params[:query])
          scope = policy_scope(scope, policy_scope_class: ::Admin::BasePolicy::Scope)
          @pagy, @suppliers = pagy(scope)

          render :index, status: :ok
        end
      end

      def show
        @supplier = Supplier.find(show_params[:supplier_id])

        render :show, status: :ok
      end

      private

      def show_params
        params.permit(:supplier_id)
      end
    end
  end
end
