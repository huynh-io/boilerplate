#!/usr/bin/env bash
# SPECKIT_DEFAULT_QUALITY_GATE_FAST
#
# Fast Quality Gates Configuration (per-iteration)
# ──────────────────────────────────────────────────────────────
# This is the SCOPED version that runs per iteration during ralph and marge.
# It should check only CHANGED files for fast feedback.
# The full gate (.specify/quality-gates.sh) runs once after loop completion.
#
# This file is optional. If absent, the full gate is used per iteration instead.
# It must exit 0 for quality gates to pass.
# ──────────────────────────────────────────────────────────────

set -uo pipefail

# Files changed against HEAD, plus untracked new files — loop iterations create
# files before committing them, so both sources are needed.
changed_files() {
  {
    git diff --name-only --diff-filter=d HEAD -- "$@"
    git ls-files --others --exclude-standard -- "$@"
  } | sort -u
}

ruby_files=()
while IFS= read -r file; do
  [ -n "$file" ] && ruby_files+=("$file")
done < <(changed_files "*.rb")

spec_files=()
while IFS= read -r file; do
  [ -n "$file" ] && spec_files+=("$file")
done < <(changed_files "*_spec.rb")

ts_files=()
while IFS= read -r file; do
  [ -n "$file" ] && ts_files+=("$file")
done < <(changed_files "*.ts" "*.tsx")

status=0

if [ ${#spec_files[@]} -gt 0 ]; then
  bundle exec rspec "${spec_files[@]}" || status=1
fi

if [ ${#ruby_files[@]} -gt 0 ]; then
  bundle exec rubocop --force-exclusion "${ruby_files[@]}" || status=1
fi

if [ ${#ts_files[@]} -gt 0 ]; then
  npx eslint "${ts_files[@]}" || status=1
  npx prettier --check "${ts_files[@]}" || status=1
  npx tsc --noEmit || status=1
  npx vitest related --run "${ts_files[@]}" || status=1
fi

exit $status
