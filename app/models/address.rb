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
class Address < ApplicationRecord
  belongs_to :addressable, polymorphic: true

  validates :address_one, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :zip_code, presence: true
end
