# frozen_string_literal: true

# == Schema Information
#
# Table name: addresses
#
#  id               :uuid             not null, primary key
#  address_one      :string
#  address_two      :string
#  addressable_type :string
#  city             :string
#  state            :string
#  zip_code         :string
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  addressable_id   :uuid
#
# Indexes
#
#  index_addresses_on_addressable  (addressable_type,addressable_id)
#
FactoryBot.define do
  factory :address do
    address_one { Faker::Address.street_address }
    address_two { Faker::Address.secondary_address }
    city { Faker::Address.city }
    state { Faker::Address.state }
    zip_code { Faker::Address.zip_code }

    trait :for_supplier do
      addressable factory: %i[supplier]
    end
  end
end
