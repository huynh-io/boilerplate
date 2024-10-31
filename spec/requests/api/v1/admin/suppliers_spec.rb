# frozen_string_literal: true

require 'rails_helper'
require 'requests_helper'

RSpec.describe 'Api::V1::Admin::Suppliers' do
  describe 'GET /api/v1/admin/suppliers/:id' do
    before do
      get_request
    end

    context 'when user is not an admin' do
      let(:supplier) { create(:supplier, :with_address) }
      let(:get_request) { get "/api/v1/admin/suppliers/#{supplier.id}" }

      it 'returns 403' do
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user is an admin' do
      include_context 'when the user is an authenticated admin'

      let(:supplier) { create(:supplier, :with_address) }
      let(:get_request) { get "/api/v1/admin/suppliers/#{supplier.id}", headers: authorization_header }

      it 'returns 200' do
        expect(response).to have_http_status(:success)
        expect(response_body).to have_key('id')
        expect(response_body).to have_key('name')
        expect(response_body).to have_key('email')
        expect(response_body).to have_key('phone')
        expect(response_body).to have_key('updated_at')
        expect(response_body).to have_key('created_at')
        expect(response_body).to have_key('address')
        expect(response_body['address']).to have_key('address_one')
        expect(response_body['address']).to have_key('address_two')
        expect(response_body['address']).to have_key('city')
        expect(response_body['address']).to have_key('state')
        expect(response_body['address']).to have_key('zip_code')
      end
    end
  end

  describe 'POST /api/v1/admin/suppliers' do
    before do
      post_request
    end

    context 'when user is not an admin' do
      let(:post_request) { post '/api/v1/admin/suppliers' }

      it 'returns 403' do
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user is an admin' do
      include_context 'when the user is an authenticated admin'

      let(:supplier_params) do
        {
          name: Faker::Company.name,
          email: Faker::Internet.email,
          phone: Faker::PhoneNumber.phone_number,
          address: {
            address_one: Faker::Address.street_address,
            address_two: Faker::Address.secondary_address,
            city: Faker::Address.city,
            state: Faker::Address.state,
            zip_code: Faker::Address.zip_code
          }
        }
      end
      let(:post_request) { post '/api/v1/admin/suppliers', params: supplier_params, headers: authorization_header }

      it 'returns 200' do
        expect(response).to have_http_status(:success)

        supplier = Supplier.last

        expect(response_body['id']).to eq(supplier.id)
        expect(response_body['name']).to eq(supplier.name)
        expect(response_body['email']).to eq(supplier.email)
        expect(response_body['phone']).to eq(supplier.phone)
        expect(response_body['address']['address_one']).to eq(supplier.address.address_one)
        expect(response_body['address']['address_two']).to eq(supplier.address.address_two)
        expect(response_body['address']['city']).to eq(supplier.address.city)
        expect(response_body['address']['state']).to eq(supplier.address.state)
        expect(response_body['address']['zip_code']).to eq(supplier.address.zip_code)
      end
    end
  end

  describe 'PUT /api/v1/admin/suppliers/:id' do
    let(:supplier) { create(:supplier, :with_address) }

    before do
      put_request
    end

    context 'when user is not an admin' do
      let(:put_request) { put '/api/v1/admin/suppliers/:id' }

      it 'returns 403' do
        expect(response).to have_http_status(:forbidden)
      end
    end

    context 'when user is an admin' do
      include_context 'when the user is an authenticated admin'

      let(:supplier_params) do
        {
          name: Faker::Company.name,
          email: Faker::Internet.email,
          phone: Faker::PhoneNumber.phone_number,
          address: {
            address_one: Faker::Address.street_address,
            address_two: Faker::Address.secondary_address,
            city: Faker::Address.city,
            state: Faker::Address.state,
            zip_code: Faker::Address.zip_code
          }
        }
      end
      let(:put_request) do
        put "/api/v1/admin/suppliers/#{supplier.id}", params: supplier_params, headers: authorization_header
      end

      it 'returns 200' do
        expect(response).to have_http_status(:success)

        supplier.reload

        expect(supplier.name).to eq(supplier_params[:name])
        expect(supplier.email).to eq(supplier_params[:email])
        expect(supplier.phone).to eq(supplier_params[:phone])
        expect(supplier.address.address_one).to eq(supplier_params[:address][:address_one])
        expect(supplier.address.address_two).to eq(supplier_params[:address][:address_two])
        expect(supplier.address.city).to eq(supplier_params[:address][:city])
        expect(supplier.address.state).to eq(supplier_params[:address][:state])
        expect(supplier.address.zip_code).to eq(supplier_params[:address][:zip_code])

        expect(response_body['id']).to eq(supplier.id)
        expect(response_body['name']).to eq(supplier.name)
        expect(response_body['email']).to eq(supplier.email)
        expect(response_body['phone']).to eq(supplier.phone)
        expect(response_body['address']['address_one']).to eq(supplier.address.address_one)
        expect(response_body['address']['address_two']).to eq(supplier.address.address_two)
        expect(response_body['address']['city']).to eq(supplier.address.city)
        expect(response_body['address']['state']).to eq(supplier.address.state)
        expect(response_body['address']['zip_code']).to eq(supplier.address.zip_code)
      end
    end
  end

  describe 'GET /api/v1/admin/suppliers' do
    context 'when user is not an admin' do
      context 'without any params' do
        let(:get_request) { get '/api/v1/admin/suppliers' }

        before do
          create(:supplier, :with_address)
          get_request
        end

        it 'returns 403' do
          expect(response).to have_http_status(:forbidden)
        end
      end

      context 'with query param' do
        let(:get_request) { get '/api/v1/admin/suppliers?query=3' }

        before do
          create(:supplier, :with_address, name: 'Supplier 1')
          create(:supplier, :with_address, name: 'Supplier 2')
          create(:supplier, :with_address, name: 'Supplier 3')

          get_request
        end

        it 'returns 403' do
          expect(response).to have_http_status(:forbidden)
        end
      end
    end

    context 'when user is an admin' do
      include_context 'when the user is an authenticated admin'

      context 'without any params' do
        let(:get_request) { get '/api/v1/admin/suppliers', headers: authorization_header }

        before do
          create(:supplier, :with_address)
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
          expect(first_object).to have_key('email')
          expect(first_object).to have_key('phone')
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
        let(:get_request) { get '/api/v1/admin/suppliers?query=3', headers: authorization_header }

        before do
          create(:supplier, :with_address, name: 'Supplier 1')
          create(:supplier, :with_address, name: 'Supplier 2')
          create(:supplier, :with_address, name: 'Supplier 3')

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
end
