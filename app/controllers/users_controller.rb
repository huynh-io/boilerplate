# frozen_string_literal: true

class UsersController < ApplicationController
  def create
    UserCreator.call(user_params)

    # throw exception
  end

  private

  def user_params
    params.permit(:username, :email, :refresh_token, :custom_metadata, :email_verified)
  end
end
