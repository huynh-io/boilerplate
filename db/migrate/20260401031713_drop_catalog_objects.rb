class DropCatalogObjects < ActiveRecord::Migration[8.1]
  def change
    drop_table :catalog_objects do |t|
      t.string :type
      t.jsonb :item_data, default: {}
      t.uuid :supplier_id, null: false
      t.timestamps
      t.index :supplier_id
    end
  end
end
