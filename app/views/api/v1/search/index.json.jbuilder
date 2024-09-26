# frozen_string_literal: true

json.catalog_items @catalog_items.map do |catalog_item|
  json.partial!(
    catalog_item:,
    partial: 'api/v1/catalog_items/catalog_item'
  )
end
