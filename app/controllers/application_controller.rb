# frozen_string_literal: true

class ApplicationController < ActionController::API
  include Pagy::Backend

  after_action :inject_pagy_headers

  private

  def inject_pagy_headers
    pagy_headers_merge(@pagy) if @pagy
  end
end
