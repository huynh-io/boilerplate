# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def index
    @props = { name: 'Stranger' }
  end
end
