# frozen_string_literal: true

module Api
  module V1
    module Admin
      class SuppliersController < AuthorizedController
        def index
          scope = Suppliers::Searcher.call(query: index_params[:query])
          scope = policy_scope(scope, policy_scope_class: ::Admin::BasePolicy::Scope)
          @pagy, @suppliers = pagy(:offset, scope)

          render :index, status: :ok
        end

        def show
          authorize Supplier, policy_class: ::Admin::BasePolicy
          @supplier = Supplier.find(params[:id])

          render :show, status: :ok
        end

        def create
          authorize Supplier, policy_class: ::Admin::BasePolicy
          @supplier = Suppliers::Creator.call(params: create_params.to_h)

          render :show, status: :ok
        end

        def update
          authorize Supplier, policy_class: ::Admin::BasePolicy
          @supplier = Suppliers::Updater.call(params: update_params.to_h)

          render :show, status: :ok
        end

        private

        def create_params
          params.permit(:name, :email, :phone, address: %i[address_one address_two city state zip_code])
        end

        def update_params
          params.permit(:id, :name, :email, :phone, address: %i[address_one address_two city state zip_code])
        end
      end
    end
  end
end
