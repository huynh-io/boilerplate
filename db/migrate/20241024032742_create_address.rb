# frozen_string_literal: true

class CreateAddress < ActiveRecord::Migration[7.2]
  def change
    create_table :addresses, id: :uuid do |t|
      t.string :city
      t.string :state
      t.string :address_one
      t.string :address_two
      t.string :zip

      t.references :addressable, index: true, polymorphic: true, type: :uuid

      t.timestamps
    end
  end
end
