# frozen_string_literal: true

json.suppliers @suppliers.map do |supplier|
  json.partial!(
    supplier:,
    partial: 'api/v1/suppliers/supplier'
  )
end
