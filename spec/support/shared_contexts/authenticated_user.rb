# frozen_string_literal: true

RSpec.shared_context 'when the user is authenticated' do
  let(:user) { create(:user) }
  let(:authorization_header) { { 'Authorization' => "Bearer #{user.access_token}" } }
end
