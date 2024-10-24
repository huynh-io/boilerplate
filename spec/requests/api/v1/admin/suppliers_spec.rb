# frozen_string_literal: true

require 'rails_helper'
require 'requests_helper'

RSpec.describe 'Api::V1::Suppliers' do
  describe 'GET /api/v1/admin/suppliers' do
    context 'without any params' do
      let(:get_request) { get '/api/v1/admin/suppliers' }

      before do
        create(:supplier)
        get_request
      end

      it 'returns 200' do
        expect(response).to have_http_status(:success)
      end

      it 'returns an array of suppliers' do
        expect(response_body).to be_an_instance_of(Hash)
        expect(response_body['suppliers']).to be_an_instance_of(Array)

        first_object = response_body['suppliers'].first
        expect(first_object).to have_key('id')
        expect(first_object).to have_key('name')
        expect(first_object).to have_key('updated_at')
        expect(first_object).to have_key('created_at')
        expect(first_object).to have_key('address')
        expect(first_object['address']).to have_key('address_one')
        expect(first_object['address']).to have_key('address_two')
        expect(first_object['address']).to have_key('city')
        expect(first_object['address']).to have_key('state')
        expect(first_object['address']).to have_key('zip_code')
      end
    end

    context 'with query param' do
      let(:get_request) { get '/api/v1/admin/suppliers?query=3' }

      before do
        create(:supplier, name: 'Supplier 1')
        create(:supplier, name: 'Supplier 2')
        create(:supplier, name: 'Supplier 3')

        get_request
      end

      it 'returns 200' do
        expect(response).to have_http_status(:success)
      end

      it 'returns a filtered array of suppliers' do
        expect(response_body).to be_an_instance_of(Hash)
        expect(response_body['suppliers']).to be_an_instance_of(Array)
        expect(response_body['suppliers'].count).to eq(1)

        first_object = response_body['suppliers'].first
        expect(first_object).to have_key('id')
        expect(first_object).to have_key('name')
        expect(first_object).to have_key('updated_at')
        expect(first_object).to have_key('created_at')
        expect(first_object['address']).to have_key('address_one')
        expect(first_object['address']).to have_key('address_two')
        expect(first_object['address']).to have_key('city')
        expect(first_object['address']).to have_key('state')
        expect(first_object['address']).to have_key('zip_code')
      end
    end
  end
end
