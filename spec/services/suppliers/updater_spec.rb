# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Suppliers::Updater, type: :service do
  let(:supplier) { create(:supplier, :with_address) }
  let(:valid_params) do
    {
      id: supplier.id,
      name: Faker::Company.name,
      email: Faker::Internet.email,
      phone: Faker::PhoneNumber.phone_number
    }
  end

  let(:invalid_params) do
    {
      id: supplier.id,
      name: nil,
      email: nil,
      phone: nil
    }
  end

  let(:not_found_params) { { id: 0 } }

  describe '#call' do
    context 'with valid params' do
      it 'updates an existing Supplier' do
        described_class.call(params: valid_params)

        supplier = Supplier.find(valid_params[:id])
        expect(supplier.name).to eq(valid_params[:name])
        expect(supplier.email).to eq(valid_params[:email])
        expect(supplier.phone).to eq(valid_params[:phone])
      end
    end

    context 'with invalid params' do
      it 'raises an ActiveRecord::RecordInvalid error' do
        expect { described_class.call(params: invalid_params) }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context 'when the record is not found' do
      it 'raises an ActiveRecord::RecordNotFound error' do
        expect { described_class.call(params: not_found_params) }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
