# frozen_string_literal: true

class AddUniqueIndices < ActiveRecord::Migration[7.2]
  disable_ddl_transaction!

  def change
    remove_index :suppliers, :name
    add_index :suppliers, :name, unique: true, algorithm: :concurrently
    add_index :users, :email, unique: true, algorithm: :concurrently
  end
end
