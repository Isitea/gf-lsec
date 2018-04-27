// Change angular cli package manager to yarn from npm
ng set --global packageManager=yarn

// Ignore engine version error: upath@1.0.4
yarn config set ignore-engines true

// Angular app build
ng build --prod --base-href=/my-base-url/