# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users, id: :uuid do |t|
      t.string :email
      t.boolean :email_verified, default: false, null: false
      t.string :refresh_token

      t.jsonb :custom_metadata

      t.timestamps
    end
  end
end
