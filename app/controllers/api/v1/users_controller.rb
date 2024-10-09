# frozen_string_literal: true

module Api
  module V1
    class UsersController < AuthorizedController
      def create
        authenticate_and_ensure_user_exists
      end

      def me
        @user = current_user

        authorize @user

        render :show, status: :ok
      end

      private

      def authenticate_and_ensure_user_exists
        # Skip authorization for this action since we are creating a user which is our current user. Subsequent calls
        # will return the current user.
        #
        # This is a special case where we are creating a user and logging in at the same time. We rely on the ID token
        # from FirebaseAuth to verify that the user is authenticated.
        skip_authorization

        decoded = Users::IdTokenVerifier.call(id_token: user_create_params[:id_token])

        if decoded
          @user = Users::Creator.call(params: decoded)
          @access_token = @user.access_token

          render :show, status: :ok
        else
          render json: { error: 'Invalid ID token' }, status: :unprocessable_entity
        end
      end

      def user_create_params
        params.permit(:id_token)
      end
    end
  end
end
