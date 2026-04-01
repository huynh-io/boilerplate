# frozen_string_literal: true

module Users
  class Searcher < ApplicationService
    attr_accessor :query

    def initialize(query: nil)
      @query = query
    end

    def call
      return User.all if query.nil?

      User.where('email ILIKE ?', "%#{query}%")
    end
  end
end
