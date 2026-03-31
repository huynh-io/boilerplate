# frozen_string_literal: true

class AddDeviseToUsers < ActiveRecord::Migration[8.1]
  def change
    safety_assured do
      change_table :users, bulk: true do |t|
        t.string :encrypted_password, null: false, default: ''
        t.string :reset_password_token
        t.datetime :reset_password_sent_at
        t.datetime :remember_created_at
        t.string :jti, null: false
      end

      add_index :users, :reset_password_token, unique: true
      add_index :users, :jti, unique: true

      remove_column :users, :access_token, :string
    end

    reversible do |dir|
      dir.up do
        User.reset_column_information
        User.find_each do |user|
          user.update_column(:jti, SecureRandom.uuid) # rubocop:disable Rails/SkipsModelValidations
        end
      end
    end
  end
end
