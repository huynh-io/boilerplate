# frozen_string_literal: true

module Api
  module V1
    class UsersController < AuthorizedController
      def me
        @user = current_user

        authorize @user

        render :show, status: :ok
      end
    end
  end
end
