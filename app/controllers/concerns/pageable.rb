# frozen_string_literal: true

module Pageable
  extend ActiveSupport::Concern

  included do
    def index_params
      # :format is permitted to suppress unpermitted parameter warnings.
      # Rails injects :format into top-level params for JSON requests and
      # params.permit always logs a warning for it.
      params.permit(:page, :query, :format)
    end
  end
end
