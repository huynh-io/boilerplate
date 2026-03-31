# frozen_string_literal: true

require 'rails_helper'
require 'requests_helper'

RSpec.describe 'Api::V1::Users' do
  describe 'GET /api/v1/users/me' do
    context 'when the user is not authenticated' do
      let(:get_request) { get '/api/v1/users/me' }

      before do
        get_request
      end

      it 'returns 401 unauthorized' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when the user is authorized' do
      include_context 'when the user is authenticated'

      let(:get_request) { get '/api/v1/users/me', headers: authorization_header }

      before do
        get_request
      end

      it 'returns 200' do
        expect(response).to have_http_status(:success)
      end

      it 'returns the user' do
        expect(response_body).to be_an_instance_of(Hash)
        expect(response_body).to have_key('id')
        expect(response_body).to have_key('email')
        expect(response_body).to have_key('updated_at')
        expect(response_body).to have_key('created_at')
        expect(response_body).not_to have_key('admin')
      end
    end

    context 'when the user is an authorized admin' do
      include_context 'when the user is an authenticated admin'

      let(:get_request) { get '/api/v1/users/me', headers: authorization_header }

      before do
        get_request
      end

      it 'returns 200' do
        expect(response).to have_http_status(:success)
      end

      it 'returns the admin user' do
        expect(response_body).to be_an_instance_of(Hash)
        expect(response_body).to have_key('id')
        expect(response_body).to have_key('email')
        expect(response_body).to have_key('updated_at')
        expect(response_body).to have_key('created_at')
        expect(response_body).to have_key('admin')
      end
    end
  end
end
