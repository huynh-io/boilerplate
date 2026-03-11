# frozen_string_literal: true

# Base controller that includes Pundit authorization, setups the current user and handles authorization errors.
# Tightly coupled with Pundit Policy classes.
class AuthorizedController < ApplicationController
  include Pundit::Authorization

  # Ensure that we authorizing all actions in the controller that inherits from this one
  after_action :verify_pundit_authorization

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  private

  def verify_pundit_authorization
    # Use `skip_authorization` per controller action for edgecases
    if action_name == 'index'
      verify_policy_scoped
    else
      verify_authorized
    end
  end

  def user_not_authorized
    render json: { error: 'You are not authorized to perform this action' }, status: :forbidden
  end

  # Pundit will use this method to get the user for policy authorization
  def current_user
    return unless access_token

    if defined?(@current_user)
      @current_user
    else
      @current_user = User.find_by(access_token:)
    end
  end

  def access_token
    # Expected header format:
    #  Authorization: Bearer <token>
    request.headers['Authorization']&.split&.last
  end
end
