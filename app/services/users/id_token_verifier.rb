# frozen_string_literal: true

module Users
  class IdTokenVerifier < ApplicationService
    attr_accessor :id_token

    def initialize(id_token:)
      @id_token = id_token
    end

    def call
      return unless id_token

      FirebaseIdToken::Certificates.request
      decoded = FirebaseIdToken::Signature.verify(id_token)

      return unless decoded

      # Decoded looks like:
      #
      # {
      #   'name' => 'string',
      #   'picture' => 'string',
      #   'iss' => 'https://securetoken.google.com/foo',
      #   'aud' => 'boilerplate-development',
      #   'auth_time' => 1_727_234_904,
      #   'user_id' => 'string',
      #   'sub' => 'string',
      #   'iat' => 1_727_234_904,
      #   'exp' => 1_727_238_504,
      #   'email' => 'string',
      #   'email_verified' => true,
      #   'firebase' => {
      #     'identities' => {
      #       'google.com' => ['string'],
      #       'email' => ['string']
      #     },
      #     'sign_in_provider' => 'google.com'
      #   }
      # }
      {
        email: decoded['email']
      }
    end
  end
end
