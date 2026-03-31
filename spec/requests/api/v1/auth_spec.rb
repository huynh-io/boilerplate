# frozen_string_literal: true

require 'rails_helper'
require 'requests_helper'

RSpec.describe 'Authentication' do
  describe 'POST /api/v1/sign_up' do
    let(:params) { { user: { email: 'test@example.com', password: 'password123', password_confirmation: 'password123' } } }

    it 'creates a user and returns JWT in Authorization header' do
      expect { post '/api/v1/sign_up', params: params }.to change(User, :count).by(1)

      expect(response).to have_http_status(:created)
      expect(response.headers['Authorization']).to be_present
      expect(response.headers['Authorization']).to start_with('Bearer ')
      expect(response_body).to include('id', 'email', 'admin')
      expect(response_body['email']).to eq('test@example.com')
      expect(response_body['admin']).to be(false)
    end

    context 'with invalid params' do
      let(:params) { { user: { email: 'bad', password: 'short' } } }

      it 'returns 422 with error messages' do
        post '/api/v1/sign_up', params: params
        expect(response).to have_http_status(:unprocessable_content)
        expect(response_body).to have_key('errors')
        expect(response_body['errors']).to be_an(Array)
        expect(response_body['errors']).not_to be_empty
      end
    end

    context 'with duplicate email' do
      before { create(:user, email: 'test@example.com') }

      it 'returns 422 with email taken error' do
        post '/api/v1/sign_up', params: params
        expect(response).to have_http_status(:unprocessable_content)
        expect(response_body['errors']).to include('Email has already been taken')
      end
    end
  end

  describe 'POST /api/v1/sign_in' do
    let!(:user) { create(:user, email: 'login@example.com', password: 'password123') }

    it 'authenticates and returns JWT in Authorization header' do
      post '/api/v1/sign_in', params: { user: { email: 'login@example.com', password: 'password123' } }

      expect(response).to have_http_status(:ok)
      expect(response.headers['Authorization']).to be_present
      expect(response_body['email']).to eq('login@example.com')
    end

    context 'with invalid credentials' do
      it 'returns unauthorized' do
        post '/api/v1/sign_in', params: { user: { email: 'login@example.com', password: 'wrong' } }
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe 'DELETE /api/v1/sign_out' do
    let(:user) { create(:user) }
    let(:jwt) { Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first }

    it 'invalidates the JWT by rotating JTI' do
      old_jti = user.jti

      delete '/api/v1/sign_out', headers: { 'Authorization' => "Bearer #{jwt}" }

      expect(response).to have_http_status(:no_content)
      expect(user.reload.jti).not_to eq(old_jti)
    end

    it 'rejects the revoked token on subsequent protected requests' do
      auth_headers = { 'Authorization' => "Bearer #{jwt}" }

      # Token works before sign-out
      get '/api/v1/users/me', headers: auth_headers
      expect(response).to have_http_status(:ok)

      # Sign out revokes the token
      delete '/api/v1/sign_out', headers: auth_headers

      # Revoked token is rejected on a protected endpoint
      get '/api/v1/users/me', headers: auth_headers
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
