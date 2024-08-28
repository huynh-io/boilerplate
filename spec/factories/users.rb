# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :uuid             not null, primary key
#  custom_metadata :jsonb
#  email           :string
#  email_verified  :boolean          default(FALSE), not null
#  refresh_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
  end
end
