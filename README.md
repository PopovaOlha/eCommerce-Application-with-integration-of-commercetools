# eCommerce-Application

## Development
1. ` git clone CURRENT_REPO_URL`
2. `cd eCommerce-Application`
3. `npm i`
4. Run project `nmp run dev`
5. Lint project `npm run lint`
6. Run tests `npm run test`
7. Prepare git hooks: 
    - `npm run prepare`
    - `npx husky add .husky/pre-commit "npm test"`
    - `git add .husky/pre-commit`

## Production build
1. `npm run build`