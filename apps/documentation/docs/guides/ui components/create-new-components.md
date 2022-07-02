---
sidebar_position: 1
---

# Creating Components

Open the project with `code workspace.code-workspace`.

Under the `@acmutd/acm-ui` workspace, navigate to the `src` folder and create a new folder with the name of your component (from now on we will simplify and use `(name)` for this).

For each component, you will create a `(name).css` file, a `(name).tsx` file and an `index.ts` file.

The `(name).css` file will contain all of the styling for your component. Alternatively, you can also style with a CSS-in-JS library, such as Styled-Components.

the `(name).tsx` file is the compoment's main file, where all the main logic for the component lies.

Lastly, the component library will import whatever is in the `index.ts` file, which most likely just means an export statement with the format `export { default } from './(name)';`

## Compiling the Component library

running `npm run build` in this package's folder is configured to run the rollup build command.
This will bundle all components into the `lib` folder, which is where the components that are ready to be used lie.

## Using Components

use the import statement: 

`import { (name) } from '@acmutd/acm-ui';`

when testing you can also import directly from the library to avoid having to rebuild too many times:

`import { (name) } from '@acmutd/acm-ui/src';`


