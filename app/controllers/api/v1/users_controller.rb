# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      def index
        # TODO: pagination
        @users = User.all
        render :index, status: :ok
      end

      def create
        @user = UserCreator.call(user_params)

        # render API response
      end

      private

      def user_params
        params.permit(:email, :refresh_token, :custom_metadata, :email_verified)
      end
    end
  end
end
