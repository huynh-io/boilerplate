# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserPolicy, type: :policy do
  permissions :me? do
    let(:current_user) { create(:user) }
    let(:another_user) { create(:user) }

    context 'when the user is the record' do
      it 'grants access' do
        expect(described_class).to permit(current_user, current_user)
      end
    end

    context 'when the user is not the record' do
      it 'does not grant access' do
        expect(described_class).not_to permit(current_user, another_user)
      end
    end
  end
end
