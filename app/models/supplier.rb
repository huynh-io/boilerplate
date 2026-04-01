# frozen_string_literal: true

# == Schema Information
#
# Table name: suppliers
#
#  id         :uuid             not null, primary key
#  email      :string
#  name       :string
#  phone      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_suppliers_on_email  (email) UNIQUE
#  index_suppliers_on_name   (name) UNIQUE
#  index_suppliers_on_phone  (phone) UNIQUE
#
# Example model showcasing polymorphic addresses via `has_one :address, as: :addressable`.
# To reuse: rename the table, model, controllers, views, and routes to fit your domain.
# Otherwise, feel free to delete everything related to suppliers.
class Supplier < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }

  has_one :address, as: :addressable, dependent: :destroy
end
