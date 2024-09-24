# frozen_string_literal: true

# == Schema Information
#
# Table name: catalog_objects
#
#  id          :uuid             not null, primary key
#  item_data   :jsonb
#  type        :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#  supplier_id :uuid             not null
#
# Indexes
#
#  index_catalog_objects_on_supplier_id  (supplier_id)
#
# Foreign Keys
#
#  fk_rails_...  (supplier_id => suppliers.id)
#
class CatalogObject < ApplicationRecord
  belongs_to :supplier

  validates :type, presence: true
end
