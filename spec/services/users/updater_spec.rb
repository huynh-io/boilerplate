# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::Updater, type: :service do
  let(:user) { create(:user) }

  before do
    user
  end

  describe '#call' do
    let(:valid_updates) do
      {
        id: user.id,
        email: Faker::Internet.email,
        custom_metadata: { 'key' => Faker::Lorem.word },
      }
    end

    let(:invalid_updates) do
      {
        id: SecureRandom.uuid,
        email: Faker::Internet.email,
        custom_metadata: { 'key' => Faker::Lorem.word },
      }
    end

    context 'with valid update params' do
      it 'updates the existing user' do
        expect(user.email).not_to eq(valid_updates[:email])
        expect(user.custom_metadata).not_to eq(valid_updates[:custom_metadata])

        described_class.call(params: valid_updates)
        user.reload

        expect(user.email).to eq(valid_updates[:email])
        expect(user.custom_metadata).to eq(valid_updates[:custom_metadata])

      end
    end

    context 'with invalid update params' do
      it 'raises an ActiveRecord::RecordInvalid error' do
        expect do
          described_class.call(params: invalid_updates)
        end.to raise_error(ActiveRecord::RecordNotFound)
      end
    end
  end
end
