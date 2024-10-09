# frozen_string_literal: true

require 'rails_helper'

RSpec.describe UserPolicy, type: :policy do
  describe 'me?' do
    let(:current_user) { create(:user) }
    let(:another_user) { create(:user) }

    context 'when the user is the record' do
      it 'grants access' do
        expect(described_class.new(current_user, current_user).me?).to be(true)
      end
    end

    context 'when the user is not the record' do
      it 'does not grant access' do
        expect(described_class.new(current_user, another_user).me?).to be(false)
      end
    end
  end
end
