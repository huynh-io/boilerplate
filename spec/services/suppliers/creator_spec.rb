# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Suppliers::Creator, type: :service do
  let(:valid_params) do
    {
      name: Faker::Company.name
    }
  end

  let(:invalid_params) do
    {}
  end

  describe '#call' do
    context 'with valid params' do
      it 'creates a new User' do
        expect { described_class.call(params: valid_params) }.to change(Supplier, :count).by(1)

        supplier = Supplier.order(:created_at).last
        expect(supplier.name).to eq(valid_params[:name])
      end
    end

    context 'with invalid params' do
      it 'raises an ActiveRecord::RecordInvalid error' do
        expect { described_class.call(params: invalid_params) }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
