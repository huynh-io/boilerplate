# frozen_string_literal: true

require 'rails_helper'
require 'requests_helper'

RSpec.describe 'Api::V1::Suppliers' do
  describe 'GET /api/v1/suppliers' do
    context 'without any params' do
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

    context 'with query param' do
      let(:get_request) { get '/api/v1/suppliers?query=3' }

      before do
        create(:supplier, name: 'Supplier 1')
        create(:supplier, name: 'Supplier 2')
        create(:supplier, name: 'Supplier 3')

        get_request
      end

      it 'returns 200' do
        expect(response).to have_http_status(:success)
      end

      it 'returns a filtered list of suppliers' do
        expect(response_body).to be_an_instance_of(Hash)
        expect(response_body['suppliers']).to be_an_instance_of(Array)
        expect(response_body['suppliers'].count).to eq(1)

        first_object = response_body['suppliers'].first
        expect(first_object).to have_key('id')
        expect(first_object).to have_key('name')
        expect(first_object).to have_key('updated_at')
        expect(first_object).to have_key('created_at')
      end
    end
  end

  describe 'POST /api/v1/suppliers' do
    let(:params) do
      { name: Faker::Company.name,
        email: Faker::Internet.email,
        phone: Faker::PhoneNumber.cell_phone }
    end

    let(:post_request) { post('/api/v1/suppliers', params:) }

    before do
      post_request
    end

    it 'returns 200' do
      expect(response).to have_http_status(:success)
    end
  end
end
