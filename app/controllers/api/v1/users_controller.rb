# frozen_string_literal: true

module Api
  module V1
    class UsersController < ApplicationController
      def verify_id_token
        # TODO: fetch certificate on a regular basis
        FirebaseIdToken::Certificates.request

        decoded = FirebaseIdToken::Signature.verify(verify_id_token_params[:id_token])
        if decoded
          # TODO: find the associated user and render that
          render json: { decoded: }, status: :ok
        else
          render json: { error: 'Invalid ID token' }, status: :unauthorized
        end
      end

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
