---
sidebar_position: 0
---

# Installation and Setup

We'll first need to get you set up with some tools and configurations to ensure a smooth development experience. For a more comprehensive overview or detailed explanation on any of the following, please reference the corresponding official documentation.

### Clone the repository

To clone the repository

```
git clone https://github.com/acmutd/portal-next.git
```

### npm

Ensure that you're using npm version of at least 8.6.0. There's a bug on previous versions that prevents npm from resolving local package dependencies within the npm workspace.

To update npm to the latest version, run `npm install -g npm@latest` or if you have [Node Version Manager](https://github.com/nvm-sh/nvm) installed `nvm install-latest-npm`

### Doppler

Doppler is a universal secrets platform, which streamlines secret management with a dashboard, CLI, and integrations for syncing secrets across development environments, cloud providers, hosting platforms, CI/CD tools, Terraform, and more. The Doppler CLI will provide access to secrets, and will inject them as environment variables into the running process from your command or script.

The next steps differ slightly for officers and for contributors.

#### Officers

- Install the Doppler CLI. This step varies depending on your operating system, so please refer to the offical [Doppler Install CLI](https://docs.doppler.com/docs/install-cli#installation) documentation for your specific installation steps
- [Login](https://docs.doppler.com/docs/install-cli#authentication) to the CLI. This will open up a browser window and ask you to authenticate; log in with your ACM email
  ```
  doppler login
  ```
- Configure Doppler by running the following in the root of the repository
  ```
  doppler setup
  ```
- Select project `portal`
- Select config `next-dev_local`

#### Contributors

- Reach out to `development@acmutd.co` to receive a Doppler service token
- Install the Doppler CLI. This step varies depending on your operating system, so please refer to the offical [Doppler Install CLI](https://docs.doppler.com/docs/install-cli#installation) documentation for your specific installation steps
- Configure Doppler by running the following in the root of the repository

  ```
  # Prevent configure command being leaked in bash history
  export HISTIGNORE='doppler*'

  # Scope to location of application directory
  echo 'dp.st.prd.xxxx' | doppler configure set token --scope /usr/src/app

  # Supply secrets to your application
  cd /usr/src/app
  doppler run -- your-command-here
  ```

Doppler will only inject the secrets as environment variables for commands or scripts which are prepended with `doppler run -- `. This is already prepended onto scripts in package.json, so you don't need to worry about prepending this yourself.

### Clone

- Clone the repository
- Run `git clone https://github.com/acmutd/portal-next`

### Visual Studio Code

This step is only relevant if you use VS Code.

Open up the project as a VS Code workspace.

#### CLI

- Navigate to the root of the respository
- Run `code workspace.code-workspace`

#### GUI

- File > Open Workspace from File... > `workspace.code-workspace`

This opens up the monorepo in VS Code as a [multi-root workspace](https://code.visualstudio.com/docs/editor/multi-root-workspaces), a feature where you can have multiple root folders in one explorer view. You'll see the various packages in the monorepo in the explorer view. This ensures that compatible VSCode extensions, such as ESLint and Prettier, scope their configurations to the specific configurations for each individual project, as opposed to using the configurations in the root directory. This is a limitation of the VS Code extensions, and will not impact lint-staged or lint and format scripts in each package.

You'll be prompted to install recommended extensions. ESLint will show errors in your editor with helpful prompts. Prettier will take care of formatting your code. Workspaces allows for easy configuration of the multi-root workspace.

### Building the Project

From the root of the repo, use Turborepo to build all the dependencies.

```
npx turbo run build
```

It is recommended to use `turbo` to run scripts; `turbo` can only be run from the root of the repository.
