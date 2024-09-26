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

def create_catalog_item(supplier:)
  CatalogItems::Creator.call(
    params: {
      supplier:,
      item_data: {
        name: Faker::Commerce.product_name
      }
    }
  )
end

def seed_suppliers
  return unless Supplier.count.zero?

  100.times do
    create_supplier.tap do |supplier|
      rand(1..10).times do
        create_catalog_item(supplier:)
      end
    end
  end
end

seed_suppliers
