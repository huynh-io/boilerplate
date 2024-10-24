# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Addresses::Creator, type: :service do
  let(:valid_params) do
    {
      address_one: Faker::Address.street_address,
      address_two: Faker::Address.secondary_address,
      city: Faker::Address.city,
      state: Faker::Address.state,
      zip_code: Faker::Address.zip_code,
      addressable: create(:supplier)
    }
  end

  let(:invalid_params) do
    {
      address_one: Faker::Address.street_address,
      address_two: Faker::Address.secondary_address,
      city: Faker::Address.city,
      state: Faker::Address.state,
      zip_code: Faker::Address.zip_code
    }
  end

  describe '#call' do
    context 'with valid params' do
      it 'creates a new Address' do
        expect { described_class.call(params: valid_params) }.to change(Address, :count).by(1)

        address = Address.order(:created_at).last
        expect(address.address_one).to eq(valid_params[:address_one])
        expect(address.address_two).to eq(valid_params[:address_two])
        expect(address.city).to eq(valid_params[:city])
        expect(address.state).to eq(valid_params[:state])
        expect(address.zip_code).to eq(valid_params[:zip_code])
      end
    end

    context 'with invalid params' do
      it 'raises an ActiveRecord::RecordInvalid error' do
        expect { described_class.call(params: invalid_params) }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
