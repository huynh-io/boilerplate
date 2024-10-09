# frozen_string_literal: true

class AuthorizedController < ApplicationController
  include Pundit::Authorization
  # Ensure that we authorizing all actions in the controller that inherits from this one
  after_action :verify_authorized

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def user_not_authorized
    render json: { error: 'You are not authorized to perform this action' }, status: :forbidden
  end

  # Pundit will use this method to get the user for policy authorization
  def current_user
    return unless access_token

    @current_user ||= User.find_by(access_token:)
  end

  def access_token
    # Expected header format:
    #  Authorization: Bearer <token>
    request.headers['Authorization']&.split&.last
  end
end
