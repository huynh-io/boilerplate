# frozen_string_literal: true

class User < ApplicationRecord
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :refresh_token, presence: true
end
