# frozen_string_literal: true

json.call(
  user, :id, :email, :created_at, :updated_at
)

json.admin user.admin? if user.admin?
