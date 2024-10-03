# frozen_string_literal: true

module Api
  module V1
    class UsersController < AuthorizedController
      skip_before_action :authorize_request, only: :create

      def create
        decoded = Users::IdTokenVerifier.call(id_token: user_create_params[:id_token])

        if decoded
          @user = Users::Creator.call(params: decoded)
          @access_token = @user.access_token

          render :show, status: :ok
        else
          render json: { error: 'Invalid ID token' }, status: :unprocessable_entity
        end
      end

      def me
        @user = current_user

        render :show, status: :ok
      end

      private

      def user_create_params
        params.permit(:id_token)
      end
    end
  end
end
