# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def index
    @hello_world_props = { name: 'Stranger' }
  end
end
