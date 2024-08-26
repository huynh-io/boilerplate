# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def index
    # Propagate bootup Rails environment to the React client
    @props = {}
  end
end
