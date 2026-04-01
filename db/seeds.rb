# frozen_string_literal: true

def create_supplier
  supplier = Suppliers::Creator.call(
    params: {
      name: Faker::Company.name,
      email: Faker::Internet.email,
      phone: Faker::PhoneNumber.phone_number
    }
  )
  Addresses::Creator.call(
    params: {
      addressable: supplier,
      address_one: Faker::Address.street_address,
      address_two: Faker::Address.secondary_address,
      city: Faker::Address.city,
      state: Faker::Address.state,
      zip_code: Faker::Address.zip_code
    }
  )
  supplier
rescue ActiveRecord::RecordInvalid
  # Try again if we hit duplicate name, email, or phone
  create_supplier
end

def seed_suppliers
  return unless Supplier.none?

  100.times do
    create_supplier
  end
end

def seed_users
  return unless User.none?

  User.create!(email: 'normal@test.com', password: '12341234', admin: false)
  User.create!(email: 'admin@test.com', password: '12341234', admin: true)
end

seed_users
seed_suppliers
