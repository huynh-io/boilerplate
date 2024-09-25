# frozen_string_literal: true

require 'rails_helper'
require 'requests_helper'

RSpec.describe 'Api::V1::CatalogItems' do
  describe 'GET /api/v1/catalog_items' do
    let(:get_request) { get '/api/v1/catalog_items' }

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

  describe 'GET /api/v1/catalog_items/:id' do
    let(:catalog_item) { create(:catalog_item) }
    let(:get_request) { get "/api/v1/catalog_items/#{catalog_item.id}" }

    before do
      get_request
    end

    it 'returns 200' do
      expect(response).to have_http_status(:success)
    end

    it 'returns the requested catalog item' do
      expect(response_body).to be_an_instance_of(Hash)

      expect(response_body).to have_key('id')
      expect(response_body).to have_key('supplier_id')
      expect(response_body).to have_key('item_data')
      expect(response_body).to have_key('updated_at')
      expect(response_body).to have_key('created_at')
    end
  end
end
