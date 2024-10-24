# frozen_string_literal: true

# == Schema Information
#
# Table name: suppliers
#
#  id         :uuid             not null, primary key
#  email      :string
#  name       :string
#  phone      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_suppliers_on_email  (email) UNIQUE
#  index_suppliers_on_name   (name) UNIQUE
#  index_suppliers_on_phone  (phone) UNIQUE
#
FactoryBot.define do
  factory :supplier do
    name { Faker::Company.name }
    email { Faker::Internet.email }

    after(:create) do |supplier|
      create(:address, addressable: supplier)
    end
  end
end
