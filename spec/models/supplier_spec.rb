# frozen_string_literal: true

# == Schema Information
#
# Table name: suppliers
#
#  id         :uuid             not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_suppliers_on_name  (name) UNIQUE
#
require 'rails_helper'

RSpec.describe Supplier do
  pending "add some examples to (or delete) #{__FILE__}"
end
