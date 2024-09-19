# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::Updater, type: :service do
  let!(:user) { create(:user) }

  let(:valid_updates) do
    {
      id: user.id,
      email: Faker::Internet.email,
      refresh_token: Faker::Internet.password(min_length: 20, max_length: 128),
      custom_metadata: { 'key' => Faker::Lorem.word },
      email_verified: Faker::Boolean.boolean
    }
  end

  # help on test to validate
  # let(:invalid_updates) do
  #  {
  #    id: user.id,
  #    email: Faker::Internet.email,
  #    refresh_token: Faker::Internet.password(min_length: 20, max_length: 128),
  #    custom_metadata: { 'key' => Faker::Lorem.word },
  #    email_verified: Faker::Boolean.boolean
  #  }
  # end

  describe '#call' do
    context 'with factory assets' do
      it 'successfully created a user for testing' do
        retrieved_user = User.find_by(id: user.id)
        expect(User.exists?(retrieved_user.id)).to be true
        expect(retrieved_user.id).to eq(user.id)
      end
    end

    context 'with valid update params' do
      it 'updates the existing user' do
        expect do
          described_class.call(params: valid_updates)
          user.reload
        end.to change { user.attributes.slice('email', 'refresh_token', 'custom_metadata', 'email_verified') }.to(
          'email' => valid_updates[:email],
          'refresh_token' => valid_updates[:refresh_token],
          'custom_metadata' => valid_updates[:custom_metadata].stringify_keys,
          'email_verified' => valid_updates[:email_verified]
        )
      end
    end
  end

  # help on test to validate
  # context 'with invalid update params' do
  #  it 'raises an ActiveRecord::RecordInvalid error' do
  #    expect { described_class.call(user:, params: invalid_updates) }.to raise_error(ActiveRecord::RecordInvalid)
  #  end
  # end
end
