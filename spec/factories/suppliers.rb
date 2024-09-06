# frozen_string_literal: true

# == Schema Information
#
# Table name: suppliers
#
#  id         :uuid             not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_suppliers_on_name  (name) UNIQUE
#
FactoryBot.define do
  factory :supplier do
    name { Faker::Company.name }
  end
end
