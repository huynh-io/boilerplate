# frozen_string_literal: true

def create_supplier
  Suppliers::Creator.call(params: { name: Faker::Company.name })
end

def seed_suppliers
  100.times { create_supplier } if Supplier.count.zero?
end

seed_suppliers
