#!/usr/bin/env bash
# Build and publish dist/ to the gh-pages branch (GitHub Pages, sorgenx.com).
# Fast-forward push only; never force.
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build            # includes spa-fallback (404.html + route files), fails if missing
git fetch -q origin gh-pages
work=$(mktemp -d)
git worktree add -f "$work" origin/gh-pages -B gh-pages >/dev/null
trap 'git worktree remove --force "$work"' EXIT
( cd "$work"
  git rm -rq . || true
  cp -r "$OLDPWD/dist/." .
  touch .nojekyll
  test "$(cat CNAME)" = "sorgenx.com"
  git add -A
  git -c user.name="SORGEN Deploy" -c user.email="dev@sorgenx.com" commit -qm "${1:-Deploy $(git -C "$OLDPWD" rev-parse --short HEAD)}" || { echo "nothing to deploy"; exit 0; }
  git push origin gh-pages )
