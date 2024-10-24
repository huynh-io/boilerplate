# frozen_string_literal: true

class RenameZipToZipCode < ActiveRecord::Migration[7.2]
  def change
    safety_assured do
      rename_column :addresses, :zip, :zip_code
    end
  end
end
