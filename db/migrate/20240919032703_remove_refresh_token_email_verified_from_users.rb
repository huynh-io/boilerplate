# frozen_string_literal: true

class RemoveRefreshTokenEmailVerifiedFromUsers < ActiveRecord::Migration[7.2]
  def change
    safety_assured do
      remove_column :users, :refresh_token, :string
      remove_column :users, :email_verified, :boolean
    end
  end
end
