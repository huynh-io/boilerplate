# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::Creator, type: :service do
  let(:valid_params) do
    {
      email: 'user@example.com',
      refresh_token: 'some_refresh_token',
      custom_metadata: { 'key' => 'value' },
      email_verified: true
    }
  end

  let(:invalid_params) do
    {
      email: 'invalid',
      refresh_token: nil
    }
  end

  describe '#call' do
    context 'with valid params' do
      it 'creates a new User' do
        expect { described_class.call(params: valid_params) }.to change(User, :count).by(1)

        user = User.last
        expect(user.email).to eq('user@example.com')
        expect(user.refresh_token).to eq('some_refresh_token')
        expect(user.custom_metadata).to eq({ 'key' => 'value' })
        expect(user.email_verified).to be(true)
      end
    end

    context 'with invalid params' do
      it 'raises an ActiveRecord::RecordInvalid error' do
        expect { described_class.call(params: invalid_params) }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end
  end
end
