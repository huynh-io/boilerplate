# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      def create
        @user = Users::Creator.call(params: user_create_params)

        render :show, status: :ok
      end

      private

      def user_create_params
        params.permit(:email, :custom_metadata)
      end
    end
  end
end
