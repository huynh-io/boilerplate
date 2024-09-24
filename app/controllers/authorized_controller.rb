# frozen_string_literal: true

class AuthorizedController < ActionController::API
  before_action :authorize_request

  private

  def authorize_user
    render json: { error: 'Unauthorized' }, status: :unauthorized unless current_user
  end

  def current_user
    decoded = verify_id_token

    return unless decoded

    User.find_by(email: decoded['email'])
  end

  def verify_id_token
    # TODO: fetch certificate on a regular basis
    FirebaseIdToken::Certificates.request
    FirebaseIdToken::Signature.verify(verify_id_token_params[:id_token])
  end
end
