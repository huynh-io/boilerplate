# frozen_string_literal: true

# Base controller that includes Pundit authorization and handles authorization errors.
# Devise-JWT automatically sets current_user from the Authorization header.
class AuthorizedController < ApplicationController
  include Pundit::Authorization

  before_action :authenticate_user!

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
end
