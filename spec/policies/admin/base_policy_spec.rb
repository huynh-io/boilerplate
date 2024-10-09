# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Admin::BasePolicy, type: :policy do
  permissions :show?, :create?, :update?, :destroy?, :new?, :edit? do
    context 'when the user is not authenticated' do
      it 'raises an exception' do
        expect do
          described_class.new(nil, nil)
        end.to raise_error Pundit::NotAuthorizedError
      end
    end

    context 'when the user is authenticated' do
      context 'when the user is not an admin' do
        let(:user) { create(:user, admin: false) }

        it 'raises an exception' do
          expect do
            described_class.new(user, nil)
          end.to raise_error Pundit::NotAuthorizedError
        end
      end

      context 'when the user is an admin' do
        let(:user) { create(:user, admin: true) }

        it 'allows access to everything' do
          expect(described_class).to permit(user, nil)
        end
      end
    end
  end
end
