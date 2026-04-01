# frozen_string_literal: true

json.users @users.map do |user|
  json.partial!(
    user:,
    partial: 'api/v1/users/user'
  )
end
