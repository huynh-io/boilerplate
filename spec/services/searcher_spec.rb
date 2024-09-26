# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Searcher, type: :service do
  describe '#call' do
    before do
      create(:catalog_item, item_data: { name: 'Supplier 1' })
      create(:catalog_item, item_data: { name: 'Supplier 2' })
      create(:catalog_item, item_data: { name: 'Supplier 3' })
    end

    context 'with a search param' do
      it 'returns an AREL with suppliers that fuzzy match the search param' do
        scope = described_class.call(query: '3')
        expect(scope.count).to eq(1)
      end
    end

    context 'without a search param' do
      it 'returns an AREL of all suppliers' do
        scope = described_class.call
        expect(scope.count).to eq(Supplier.count)
      end
    end
  end
end
