# frozen_string_literal: true

require 'rails_helper'
require 'requests_helper'

RSpec.describe 'Api::V1::Search' do
  describe 'GET /api/v1/search' do
    let(:get_request) { get '/api/v1/search' }

    context 'without any params' do
      before do
        create_list(:catalog_item, 3)
        get_request
      end

      it 'returns 200' do
        expect(response).to have_http_status(:success)
      end

      it 'returns an array of catalog items' do
        expect(response_body).to be_an_instance_of(Hash)
        expect(response_body['catalog_items']).to be_an_instance_of(Array)

        first_object = response_body['catalog_items'].first
        expect(first_object).to have_key('id')
        expect(first_object).to have_key('supplier_id')
        expect(first_object).to have_key('item_data')
        expect(first_object).to have_key('updated_at')
        expect(first_object).to have_key('created_at')
      end
    end

    context 'with query param' do
      let(:get_request) { get '/api/v1/search?query=3' }

      before do
        create(:catalog_item, item_data: { name: 'Item 1' })
        create(:catalog_item, item_data: { name: 'Item 2' })
        create(:catalog_item, item_data: { name: 'Item 3' })

        get_request
      end

      it 'returns 200' do
        expect(response).to have_http_status(:success)
      end

      it 'returns a filtered array of suppliers' do
        expect(response_body).to be_an_instance_of(Hash)
        expect(response_body['catalog_items']).to be_an_instance_of(Array)
        expect(response_body['catalog_items'].count).to eq(1)

        first_object = response_body['catalog_items'].first
        expect(first_object).to have_key('id')
        expect(first_object).to have_key('item_data')
        expect(first_object).to have_key('updated_at')
        expect(first_object).to have_key('created_at')
      end
    end
  end
end
