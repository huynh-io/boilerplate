# frozen_string_literal: true

# == Schema Information
#
# Table name: suppliers
#
#  id         :bigint           not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_suppliers_on_name  (name)
#
FactoryBot.define do
  factory :supplier do
    name { Faker::Business.name }
  end
end
