# frozen_string_literal: true

module Users
  class Creator < ApplicationService
    attr_accessor :params

    def initialize(params:)
      @params = params.to_h.with_indifferent_access
    end

    def call
      User.find_or_create_by!(email: params[:email])
    end
  end
end
