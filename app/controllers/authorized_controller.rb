# frozen_string_literal: true

class AuthorizedController < ApplicationController
  include Pundit::Authorization

  before_action :authenticate_request

  private

  def authenticate_request
    render json: { error: 'Unauthorized' }, status: :unauthorized unless current_user
  end

  def current_user
    return unless access_token

    User.find_by(access_token:)
  end

  def access_token
    # Expected header format:
    #  Authorization: Bearer <token>
    request.headers['Authorization']&.split&.last
  end
end
