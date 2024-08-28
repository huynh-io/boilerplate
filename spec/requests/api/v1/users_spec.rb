# frozen_string_literal: true

require 'rails_helper'
require 'requests_helper'

RSpec.describe 'Api::V1::Users' do
  describe 'GET /api/v1/users' do
    let(:get_request) { get '/api/v1/users' }

    before do
      create(:user)
      get_request
    end

    it 'returns 200' do
      expect(response).to have_http_status(:success)
    end

    it 'returns an appropriate general response payload' do
      expect(response_body).to be_an_instance_of(Array)
      puts response_body

      first_object = response_body.first
      expect(first_object).to have_key('id')
      expect(first_object).to have_key('email')
    end
  end
end
