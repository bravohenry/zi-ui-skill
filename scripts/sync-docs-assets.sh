#!/usr/bin/env bash
# sync-docs-assets.sh
#
# Mirror the two truth-source CSS files from assets/ (skill) into
# docs/assets/ (docs site).
#
# WHY: GitHub Pages serves from /docs, so docs-site HTML can't reach up
# and out of that path to consume the skill's root assets/ at runtime.
# The docs site therefore keeps a physical mirror of the two truth-source
# files in docs/assets/. The skill's copies at assets/tokens.css and
# assets/components.css remain the authoritative versions — this script
# only copies one direction: root → docs.
#
# Run this whenever you edit assets/tokens.css or assets/components.css.
# A CI check could also run it in --check mode to verify sync status.

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

for file in tokens.css components.css; do
  src="assets/$file"
  dst="docs/assets/$file"
  if ! cmp -s "$src" "$dst"; then
    cp "$src" "$dst"
    echo "synced: $src → $dst"
  else
    echo "in sync: $file"
  fi
done
