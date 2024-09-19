# frozen_string_literal: true

# == Schema Information
#
# Table name: users
#
#  id              :uuid             not null, primary key
#  custom_metadata :jsonb
#  email           :string
#  email_verified  :boolean          default(FALSE), not null
#  refresh_token   :string
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#
class User < ApplicationRecord
  validates :email, presence: true, uniqueness: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  # TODO: remove this since frontend + firebase auth will handle this
  validates :refresh_token, presence: true
end
