git update-ref -d HEAD
git reset
git add .gitignore LICENSE README.md package-lock.json
git commit -m "chore: initial setup and project documentation"

git add server/package.json server/package-lock.json server/server.js server/config/ server/models/ server/.env.example server/.gitignore
git commit -m "feat(backend): setup server configuration and database connection"

git add server/middleware/auth.js server/routes/auth.js
git commit -m "feat(backend): implement user authentication API"

git add server/routes/jobs.js server/cron/
git commit -m "feat(backend): implement jobs API and scheduled fetching"

git add client/package.json client/package-lock.json client/vite.config.js client/tailwind.config.js client/postcss.config.js client/index.html
git commit -m "feat(frontend): setup vite and tailwind css"

git add client/src/main.jsx client/src/App.jsx client/src/api/ client/src/context/
git commit -m "feat(frontend): setup react router and auth context"

git add client/src/components/ client/src/index.css
git commit -m "feat(frontend): build reusable UI components"

git add client/src/pages/
git commit -m "feat(frontend): create application dashboard and auth pages"

git add .
git commit -m "fix: harden API pagination and finalize setup"

git push -u origin main --force
