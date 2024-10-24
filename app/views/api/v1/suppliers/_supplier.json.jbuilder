# frozen_string_literal: true

json.call(
  supplier, :id, :name, :email, :phone, :created_at, :updated_at
)

json.address do
  json.partial!(
    address: supplier.address,
    partial: 'api/v1/address'
  )
end
