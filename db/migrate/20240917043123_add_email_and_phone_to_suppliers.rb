# frozen_string_literal: true

class AddEmailAndPhoneToSuppliers < ActiveRecord::Migration[7.2]
  disable_ddl_transaction!

  def change
    add_column :suppliers, :email, :string # rubocop:disable Rails/BulkChangeTable
    add_column :suppliers, :phone, :string

    add_index :suppliers, :email, unique: true, algorithm: :concurrently
    add_index :suppliers, :phone, unique: true, algorithm: :concurrently
  end
end
