# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      def create
        decoded = Users::IdTokenVerifier.call(id_token: user_create_params[:id_token])
        @user = Users::Creator.call(params: decoded)

        render :show, status: :ok
      end

      private

      def user_create_params
        params.permit(:id_token)
      end
    end
  end
end
