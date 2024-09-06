# frozen_string_literal: true

require 'rails_helper'
require 'requests_helper'

RSpec.describe 'Api::V1::Suppliers' do
  describe 'GET /api/v1/suppliers' do
    let(:get_request) { get '/api/v1/suppliers' }

    before do
      create(:supplier)
      get_request
    end

    it 'returns 200' do
      expect(response).to have_http_status(:success)
    end

    it 'returns a list of suppliers' do
      expect(response_body).to be_an_instance_of(Hash)
      expect(response_body['suppliers']).to be_an_instance_of(Array)

      first_object = response_body['suppliers'].first
      expect(first_object).to have_key('id')
      expect(first_object).to have_key('name')
      expect(first_object).to have_key('updated_at')
      expect(first_object).to have_key('created_at')
    end
  end
end
