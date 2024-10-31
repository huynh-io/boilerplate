# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Addresses::Updater, type: :service do
  let(:supplier) { create(:supplier, :with_address) }
  let(:valid_params) do
    {
      addressable: supplier,
      address_one: Faker::Address.street_address,
      address_two: Faker::Address.secondary_address,
      city: Faker::Address.city,
      state: Faker::Address.state,
      zip_code: Faker::Address.zip_code
    }
  end

  let(:invalid_params) do
    {
      addressable: supplier,
      address_one: nil,
      city: nil,
      state: nil,
      zip_code: nil
    }
  end

  let(:not_found_params) { {} }

  describe '#call' do
    context 'with valid params' do
      it 'updates an existing Address' do
        described_class.call(params: valid_params)

        address = supplier.reload.address
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

    context 'when the addressable is not provided' do
      it 'raises an ActiveRecord::RecordInvalid error' do
        expect { described_class.call(params: not_found_params) }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
