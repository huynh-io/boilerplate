# frozen_string_literal: true

module Users
  class Deleter < ApplicationService
    attr_accessor :user_id

    # init
    def initialize(user_id:)
      @user_id = user_id
    end

    def call
      user = User.find_by(id: user_id)

      # TODO: error handling

      # Delete the user
      user.destroy
    end
  end
end
