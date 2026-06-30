# Build the project (Windows)
npm run build
if ($LASTEXITCODE -ne 0) { exit 1 }

# Remove old dist git to force fresh commit
Remove-Item -Recurse -Force dist\.git -ErrorAction SilentlyContinue

# Navigate to build output
Push-Location dist

# Initialize git and commit
git init
git add -A
git commit -m "Deploy to GitHub Pages"

Pop-Location

# Use Git Bash for the SSH push (SSH works correctly there)
& "C:\Users\amatti\Git\usr\bin\bash.exe" -c "cd dist && GIT_SSH_COMMAND='ssh -i ../.ssh/id_ed25519 -o IdentitiesOnly=yes' git push -f git@github.com:andrewmatti12/amamamamamamama.git HEAD:gh-pages"

if ($LASTEXITCODE -eq 0) {
    Write-Host "Deployed successfully!" -ForegroundColor Green
} else {
    Write-Host "Deploy failed!" -ForegroundColor Red
    exit 1
}
