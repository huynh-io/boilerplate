# frozen_string_literal: true

class CreateSuppliers < ActiveRecord::Migration[7.2]
  def change
    create_table :suppliers, id: :uuid do |t|
      t.string :name

      t.timestamps
    end
    add_index :suppliers, :name
  end
end
