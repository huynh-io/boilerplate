# frozen_string_literal: true

module Pageable
  extend ActiveSupport::Concern

  included do
    def index_params
      params.permit(:page, :query)
    end
  end
end
