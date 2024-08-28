# frozen_string_literal: true

class CreateUsers < ActiveRecord::Migration[7.2]
  def change
    create_table :users, id: :uuid do |t|
      t.string :email
      t.boolean :email_verified, default: false, null: false
      t.string :refresh_token

      # fields omitted from firebase that could be stored here:
      # metadata, providerData, tenantId, isAnonymous, providerData
      # https://firebase.google.com/docs/reference/js/auth.user.md#user_interface
      t.jsonb :custom_metadata

      t.timestamps
    end
  end
end
