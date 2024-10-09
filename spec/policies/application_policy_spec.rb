# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ApplicationPolicy, type: :policy do
  permissions :show?, :create?, :update?, :destroy?, :new?, :edit? do
    context 'when the user is not authenticated' do
      it 'raises an exception' do
        expect do
          described_class.new(nil, nil)
        end.to raise_error Pundit::NotAuthorizedError
      end
    end

    context 'when the user is authenticated' do
      let(:user) { create(:user) }

      it 'raises an exception' do
        expect(described_class).not_to permit(user, nil)
      end
    end
  end
end
