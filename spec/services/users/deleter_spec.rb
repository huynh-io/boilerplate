# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::Deleter, type: :service do
  let(:user) { create(:user) }

  describe '#call' do
    before do
      user
    end

    it 'gets deleted' do
      expect(User.count).to eq(1)
      described_class.call(user_id: user.id)
      expect(User.count).to eq(0)
    end
  end
end
