# frozen_string_literal: true

require 'rails_helper'
require 'requests_helper'

RSpec.describe 'Api::V1::Users' do
  # TODO: Move into Admin namespace
  # describe 'GET /api/v1/users' do
  #   let(:get_request) { get '/api/v1/users' }

  #   before do
  #     create(:user)
  #     get_request
  #   end

  #   it 'returns 200' do
  #     expect(response).to have_http_status(:success)
  #   end

  #   it 'returns an array of users' do
  #     expect(response_body).to be_an_instance_of(Hash)
  #     expect(response_body['users']).to be_an_instance_of(Array)

  #     first_object = response_body['users'].first
  #     expect(first_object).to have_key('id')
  #     expect(first_object).to have_key('email')
  #     expect(first_object).to have_key('updated_at')
  #     expect(first_object).to have_key('created_at')
  #   end
  # end

  describe 'POST /api/v1/users' do
    let(:params) do
      { email: Faker::Internet.email }
    end
    let(:post_request) { post('/api/v1/users', params:) }

    before do
      post_request
    end

    it 'returns 200' do
      expect(response).to have_http_status(:success)
    end

    it 'returns the created user' do
      expect(response_body).to be_an_instance_of(Hash)

      expect(response_body).to have_key('id')
      expect(response_body).to have_key('email')
      expect(response_body).to have_key('updated_at')
      expect(response_body).to have_key('created_at')
    end
  end
end
