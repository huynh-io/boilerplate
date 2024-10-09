# frozen_string_literal: true

require 'rails_helper'
require 'requests_helper'

RSpec.describe 'Api::V1::Users' do
  describe 'GET /api/v1/users/me' do
    context 'when the user is not authorized' do
      let(:get_request) { get '/api/v1/users/me' }

      before do
        get_request
      end

      it 'returns 403 forbidden' do
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when the user is authorized' do
      let(:user) { create(:user) }
      let(:authorization_header) { { 'Authorization' => "Bearer #{user.access_token}" } }
      let(:get_request) { get '/api/v1/users/me', headers: authorization_header }

      before do
        get_request
      end

      it 'returns 200' do
        expect(response).to have_http_status(:success)
      end

      it 'returns an array of users' do
        expect(response_body).to be_an_instance_of(Hash)
        expect(response_body).to have_key('id')
        expect(response_body).to have_key('email')
        expect(response_body).to have_key('updated_at')
        expect(response_body).to have_key('created_at')
      end
    end
  end

  describe 'POST /api/v1/users' do
    let(:params) do
      { id_token: 'SOMERANDOM.JWT' }
    end
    let(:decoded) do
      { email: Faker::Internet.email }
    end
    let(:post_request) { post('/api/v1/users', params:) }

    before do
      allow(Users::IdTokenVerifier).to receive(:call).and_return(decoded)
      post_request
    end

    it 'returns 200' do
      expect(response).to have_http_status(:success)
    end

    it 'returns the created user' do
      expect(response_body).to be_an_instance_of(Hash)

      expect(response_body).to have_key('id')
      expect(response_body).to have_key('email')
      expect(response_body).to have_key('access_token')
      expect(response_body).to have_key('updated_at')
      expect(response_body).to have_key('created_at')
    end
  end
end
