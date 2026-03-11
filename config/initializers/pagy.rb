# frozen_string_literal: true

# Pagy initializer file (43.3.2)
# See https://ddnexus.github.io/pagy/resources/initializer/

# Global Options
# See https://ddnexus.github.io/pagy/toolbox/options/

# Headers: customize the header names for API pagination responses
# The headers_hash helper reads from options[:headers_map] or falls back to Pagy::DEFAULT_HEADERS_MAP
# DEFAULT_HEADERS_MAP = { page: 'current-page', limit: 'page-limit', count: 'total-count', pages: 'total-pages' }
# Override to match existing API contract:
Pagy::OPTIONS[:headers_map] = { page: 'Current-Page',
                                limit: 'Page-Items',
                                count: 'Total-Count',
                                pages: 'Total-Pages' }.freeze

# Overflow: serve empty page (equivalent to old overflow extra with :empty_page mode)
# Pagy 43 serves empty pages by default for out-of-range pages, no extra needed.

Pagy::OPTIONS.freeze
