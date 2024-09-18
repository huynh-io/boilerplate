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
class Supplier < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :email, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
end
