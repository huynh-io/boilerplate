# frozen_string_literal: true

class CreateCatalogObjects < ActiveRecord::Migration[7.2]
  def change
    create_table :catalog_objects, id: :uuid do |t|
      t.string :type
      t.jsonb :item_data, default: {}

      t.references :supplier, index: true, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
