# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::Creator, type: :service do
  let(:valid_params) do
    {
      email: Faker::Internet.email,
      custom_metadata: { 'key' => 'value' }
    }
  end

  let(:invalid_params) do
    {
      email: 'invalid'
    }
  end

  describe '#call' do
    context 'with valid params' do
      it 'creates a new User' do
        expect { described_class.call(params: valid_params) }.to change(User, :count).by(1)
        user = User.last
        expect(user.email).to eq(valid_params[:email])
        expect(user.custom_metadata).to eq(valid_params[:custom_metadata])
      end
    end

    context 'with invalid params' do
      it 'raises an ActiveRecord::RecordInvalid error' do
        expect { described_class.call(params: invalid_params) }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
