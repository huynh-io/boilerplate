# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      def index
        @pagy, @users = pagy(User.all)

        render :index, status: :ok
      end

      def create
        @user = Users::Creator.call(params: user_create_params)

        render :show, status: :ok
      end

      private

      def verify_id_token_params
        params.permit(:id_token)
      end

      def user_create_params
        params.permit(:email, :custom_metadata)
      end
    end
  end
end
