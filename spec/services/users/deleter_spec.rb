# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::Deleter, type: :service do
  let(:user) { create(:user) }
  let(:user_id) { user.id }

  describe '#call' do
    before do
      user
    end

    context 'when user does exist' do
      it 'gets deleted' do
        expect(User.count).to eq(1)

        described_class.call(user_id:)

        expect(User.count).to eq(0)
      end
    end

    context 'when user does not exist' do
      it 'does not raise an error' do
        expect(User.count).to eq(1)

        expect do
          described_class.call(user_id: 'bad_id')
        end.not_to raise_error

        expect(User.count).to eq(1)
      end
    end
  end
end
