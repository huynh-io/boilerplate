# frozen_string_literal: true

json.partial!(
  user: @user,
  partial: 'api/v1/users/user'
)

json.access_token @access_token if @access_token.present?
