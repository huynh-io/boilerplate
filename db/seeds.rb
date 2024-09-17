# frozen_string_literal: true

def create_supplier
  Suppliers::Creator.call(
    params: {
      name: Faker::Company.name,
      email: Faker::Internet.email,
      phone: Faker::PhoneNumber.phone_number
    }
  )
rescue ActiveRecord::RecordInvalid
  # Try again if we hit duplicate name, email, or phone
  create_supplier
end

def seed_suppliers
  100.times { create_supplier } if Supplier.count.zero?
end

seed_suppliers
