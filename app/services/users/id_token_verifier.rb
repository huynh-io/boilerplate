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
      FirebaseIdToken::Signature.verify(id_token)
    end
  end
end
