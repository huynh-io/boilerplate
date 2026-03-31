# frozen_string_literal: true

RSpec.shared_context 'when the user is authenticated' do
  let(:user) { create(:user) }
  let(:jwt) { Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first }
  let(:authorization_header) { { 'Authorization' => "Bearer #{jwt}" } }
end

RSpec.shared_context 'when the user is an authenticated admin' do
  let(:user) { create(:user, admin: true) }
  let(:jwt) { Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first }
  let(:authorization_header) { { 'Authorization' => "Bearer #{jwt}" } }
end
