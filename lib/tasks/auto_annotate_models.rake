# frozen_string_literal: true

# NOTE: only doing this in development as some production environments (Heroku)
# NOTE: are sensitive to local FS writes, and besides -- it's just not proper
# NOTE: to have a dev-mode tool do its thing in production.
if Rails.env.development?
  require 'annotate_rb'

  task set_annotation_options: :environment do
    AnnotateRb::Options.from({
                               position_in_class: 'before',
                               position_in_test: 'before',
                               position_in_fixture: 'before',
                               position_in_factory: 'before',
                               position_in_serializer: 'before',
                               show_foreign_keys: true,
                               show_indexes: true,
                               model_dir: 'app/models',
                               include_version: false,
                               exclude_tests: false,
                               exclude_fixtures: false,
                               exclude_factories: false,
                               exclude_serializers: false,
                               exclude_scaffolds: true,
                               exclude_controllers: true,
                               exclude_helpers: true,
                               with_comment: true
                             })
  end

  AnnotateRb::Core.load_rake_tasks
end
