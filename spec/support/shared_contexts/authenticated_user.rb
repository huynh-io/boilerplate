# frozen_string_literal: true

RSpec.shared_context 'when the user is authenticated' do
  let(:user) { create(:user) }
  let(:authorization_header) { { 'Authorization' => "Bearer #{user.access_token}" } }
end

RSpec.shared_context 'when the user is an authenticated admin' do
  let(:user) { create(:user, admin: true) }
  let(:authorization_header) { { 'Authorization' => "Bearer #{user.access_token}" } }
end
