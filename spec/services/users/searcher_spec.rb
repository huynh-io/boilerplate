# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::Searcher, type: :service do
  describe '#call' do
    before do
      create(:user, email: 'alice@example.com')
      create(:user, email: 'bob@example.com')
      create(:user, email: 'carol@example.com')
    end

    context 'with a search param' do
      it 'returns an AREL with users that fuzzy match the search param' do
        scope = described_class.call(query: 'alice')
        expect(scope.count).to eq(1)
      end
    end

    context 'without a search param' do
      it 'returns an AREL of all users' do
        scope = described_class.call
        expect(scope.count).to eq(User.count)
      end
    end
  end
end
