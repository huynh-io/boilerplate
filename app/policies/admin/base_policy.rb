# frozen_string_literal: true

module Admin
  class BasePolicy < ApplicationPolicy
    def initialize(user, record)
      super
      raise Pundit::NotAuthorizedError, 'must be an admin' unless user.admin?

      @user = user
      @record = record
    end

    def index?
      true
    end

    def show?
      true
    end

    def create?
      true
    end

    def new?
      create?
    end

    def update?
      true
    end

    def edit?
      update?
    end

    def destroy?
      true
    end

    class Scope < ApplicationPolicy::Scope
      def initialize(user, scope)
        super
        raise Pundit::NotAuthorizedError, 'must be an admin' unless user.admin?

        @user = user
        @scope = scope
      end

      def resolve
        # Admin can see everything
        scope.all
      end

      private

      attr_reader :user, :scope
    end
  end
end
