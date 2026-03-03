# frozen_string_literal: true

class ApplicationController < ActionController::API
  include Pagy::Backend
  include Pageable

  after_action :inject_pagy_headers

  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  rescue_from ActiveRecord::RecordInvalid, with: :record_invalid

  private

  def inject_pagy_headers
    pagy_headers_merge(@pagy) if @pagy
  end

  def record_not_found
    render json: { error: 'Record not found' }, status: :not_found
  end

  def record_invalid(exception)
    render json: { error: exception.record.errors }, status: :unprocessable_content
  end
end
