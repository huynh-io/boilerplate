# frozen_string_literal: true

module Api
  module V1
    module Admin
      class UsersController < AuthorizedController
        def index
          scope = Users::Searcher.call(query: index_params[:query])
          scope = policy_scope(scope, policy_scope_class: ::Admin::BasePolicy::Scope)
          @pagy, @users = pagy(:offset, scope)

          render :index, status: :ok
        end

        def show
          authorize User, policy_class: ::Admin::BasePolicy
          @user = User.find(params[:id])

          render :show, status: :ok
        end
      end
    end
  end
end
