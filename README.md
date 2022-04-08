# AcmutdPortal

## Getting Started

### Visual Studio Code

Multi-root workspaces are a necessary feature to ensure that the prettier and eslint extensions properly scope to the individual packages. https://github.com/prettier/prettier/issues/4081 An extension that makes working with monorepos and abstracts the workspaces feature of VSCode is `folke.vscode-monorepo-workspace`

## Setting up configurations for a monorepo

Since we're using lint-staged with husky, we need a `.lintstagedrc.json` in each project directory. This endures that the project specific eslint and prettier configs are used when running lint-staged. https://github.com/okonet/lint-staged#how-to-use-lint-staged-in-a-multi-package-monorepo

Due to how VSCode extensions ESLint and Prettier work, we must use multi-root workspaces to ensure that the extensions use the project specific eslint and prettier configs. Some issues may arise if not doing so, such as eslint not using specific rules that a project has specified
