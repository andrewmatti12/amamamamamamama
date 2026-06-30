#!/bin/bash
set -e

# Build
npm run build

# Clean and init
rm -rf dist/.git
cd dist

git init
git add -A
git commit -m "Deploy to GitHub Pages"

# Push using the project SSH key
GIT_SSH_COMMAND="ssh -i ../.ssh/id_ed25519 -o IdentitiesOnly=yes" \
  git push -f git@github.com:andrewmatti12/amamamamamamama.git HEAD:gh-pages

echo "Deployed successfully!"
