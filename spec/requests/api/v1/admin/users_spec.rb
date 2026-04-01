# frozen_string_literal: true

require 'rails_helper'
require 'requests_helper'

RSpec.describe 'Api::V1::Admin::Users' do
  describe 'GET /api/v1/admin/users/:id' do
    before do
      get_request
    end

    context 'when user is not an admin' do
      let(:target_user) { create(:user) }
      let(:get_request) { get "/api/v1/admin/users/#{target_user.id}" }

      it 'returns 401' do
        expect(response).to have_http_status(:unauthorized)
      end
    end

    context 'when user is an admin' do
      include_context 'when the user is an authenticated admin'

      let(:target_user) { create(:user, email: 'target@example.com') }
      let(:get_request) { get "/api/v1/admin/users/#{target_user.id}", headers: authorization_header }

      it 'returns 200' do
        expect(response).to have_http_status(:success)
        expect(response_body).to have_key('id')
        expect(response_body).to have_key('email')
        expect(response_body).to have_key('admin')
        expect(response_body).to have_key('created_at')
        expect(response_body).to have_key('updated_at')
      end

      context 'when no record matches the params' do
        let(:get_request) { get '/api/v1/admin/users/FAKEID', headers: authorization_header }

        it 'returns 404' do
          expect(response).to have_http_status(:not_found)
        end
      end
    end
  end

  describe 'GET /api/v1/admin/users' do
    context 'when user is not an admin' do
      context 'without any params' do
        let(:get_request) { get '/api/v1/admin/users' }

        before do
          create(:user)
          get_request
        end

        it 'returns 401' do
          expect(response).to have_http_status(:unauthorized)
        end
      end

      context 'with query param' do
        let(:get_request) { get '/api/v1/admin/users?query=alice' }

        before do
          create(:user, email: 'alice@example.com')
          create(:user, email: 'bob@example.com')
          create(:user, email: 'carol@example.com')

          get_request
        end

        it 'returns 401' do
          expect(response).to have_http_status(:unauthorized)
        end
      end
    end

    context 'when user is an admin' do
      include_context 'when the user is an authenticated admin'

      context 'without any params' do
        let(:get_request) { get '/api/v1/admin/users', headers: authorization_header }

        before do
          create(:user, email: 'other@example.com')
          get_request
        end

        it 'returns 200' do
          expect(response).to have_http_status(:success)
        end

        it 'returns an array of users' do
          expect(response_body).to be_an_instance_of(Hash)
          expect(response_body['users']).to be_an_instance_of(Array)

          first_object = response_body['users'].first
          expect(first_object).to have_key('id')
          expect(first_object).to have_key('email')
          expect(first_object).to have_key('admin')
          expect(first_object).to have_key('created_at')
          expect(first_object).to have_key('updated_at')
        end
      end

      context 'with query param' do
        let(:get_request) { get '/api/v1/admin/users?query=alice', headers: authorization_header }

        before do
          create(:user, email: 'alice@example.com')
          create(:user, email: 'bob@example.com')
          create(:user, email: 'carol@example.com')

          get_request
        end

        it 'returns 200' do
          expect(response).to have_http_status(:success)
        end

        it 'returns a filtered array of users' do
          expect(response_body).to be_an_instance_of(Hash)
          expect(response_body['users']).to be_an_instance_of(Array)
          expect(response_body['users'].count).to eq(1)

          first_object = response_body['users'].first
          expect(first_object).to have_key('id')
          expect(first_object).to have_key('email')
          expect(first_object).to have_key('admin')
          expect(first_object).to have_key('created_at')
          expect(first_object).to have_key('updated_at')
        end
      end
    end
  end
end
