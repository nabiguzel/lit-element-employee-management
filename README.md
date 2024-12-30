
# Employee Management Application

Create a web application using the LitElement JavaScript version.

The fictional web application should help our HR staff to help manage the company's employee
information.

The application should consist of the functionality below:

- List all employee records
- Add a new employee record
- Edit an existing employee record
- Delete an existing employee record

## 1. List All Employee Records

- Create a web component to display the employee records. The data presentation format can be in two
forms: a list or a table. The user should be able to select the data presentation format.
- The web component should contain pagination and search functionalities for each data presentation
formats.
- For each record displayed the user should be able to perform Edit and Delete operations on that record
as well.

## 2. Add a New Employee Record

- Create a web component to allow a user to create a new employee record.
- The user will need to enter the information below in order to create a new record:

```
* First Name
```
```
* Last name
```
```
* Date of Employment
```
```
* Date of Birth
```
```
* Phone Number
```
```
* Email Address
```
```
* Department - This is a predefined list which will have the values: Analytics, Tech
```

```
* Position - This is a predefined list which will have the values: Junior, Medior, Senior
```
- When the operation is completed, the user should be navigated to the employee list page.

**NOTE** : Please add the appropriate validations to the input fields in order to prevent the submission of
data in an incorrect format or to ensure the uniqueness of a record.

## 3. Edit an Existing Employee Record

- Create a web component to allow a user to edit and update an existing employee record.
- The web component should be accessible from the employee list page through the Edit button and
should take the selected employee object as a reactive input property in order to display its fields.
- When the operation is completed, the user should be navigated to the employee list page.

**NOTE- 1** : The same rules apply to the editing an existing record as in creating a new one, so those steps
are not repeated here to reduce redundancy so please be aware of them.

**NOTE- 2** : Prompt the user before updating the employee record as soon as the user submits them in
order to prevent mistakes.

**TIP** : You can create a single reusable web component for both creating and editing a user record. This
might save some development time for you.

## 4. Delete an Existing Employee Record

- When the user clicks the Delete button of an existing record, the selected record should be removed,
and the listing should be updated.

**NOTE** : Prompt the user before deleting the employee record as soon as the user submits them in order
to prevent mistakes.

## Additional Requirements:

- Create a navigation menu web component for allowing the user to navigate between the different
pages of the application.
- Integrate a router and configurate the appropriate routes for navigation. You can use Vaadin Router for
this or any other router you like.


- Design each component/page of the application to be viewed both in desktop mode and in responsive
mode without any flaws. You're forbidden to use any responsive css libraries like Bootstrap.
- Implement a state management mechanism to persist data in the browser memory since you won't
have a backend to work with for persistence. You can use a 3rd party library like Redux or can come up
with your own solution for this.
- Add the localization support to your web components for Turkish and English languages. You can read
the localization setting from the root html's lang attribute for this.
- Add detailed unit tests for each web component and the functionality you create. The coverage ratio
must be at least 85%.
- Please use the LitElement's JavaScript version for creating the application as stated in the description
above.

**IMPORTANT** : Please make sure to submit a working application. Any applications that are not working
will not be considered for further evaluation.

You can use the LitElement Javascript starter project for working upon by downloading it from:
**https://github.com/lit/lit-element-starter-js**

For further information about LitElement you can visit: **https://lit.dev/docs/getting-started/**


# LitElement JavaScript starter

This project includes a sample component using LitElement with JavaScript.

This template is generated from the `lit-starter-js` package in [the main Lit
repo](https://github.com/lit/lit). Issues and PRs for this template should be
filed in that repo.

## About this release

This is a pre-release of Lit 3.0, the next major version of Lit.

Lit 3.0 has very few breaking changes from Lit 2.0:

- Drops support for IE11
- Published as ES2021
- Removes a couple of deprecated Lit 1.x APIs

Lit 3.0 should require no changes to upgrade from Lit 2.0 for the vast majority of users. Once the full release is published, most apps and libraries will be able to extend their npm version ranges to include both 2.x and 3.x, like `"^2.7.0 || ^3.0.0"`.

Lit 2.x and 3.0 are _interoperable_: templates, base classes, directives, decorators, etc., from one version of Lit will work with those from another.

Please file any issues you find on our [issue tracker](https://github.com/lit/lit/issues).

## Setup

Install dependencies:

```bash
npm i
```

## Testing

This sample modern-web.dev's
[@web/test-runner](https://www.npmjs.com/package/@web/test-runner) for testing. See the
[modern-web.dev testing documentation](https://modern-web.dev/docs/test-runner/overview) for
more information.

Tests can be run with the `test` script, which will run your tests against Lit's development mode (with more verbose errors) as well as against Lit's production mode:

```bash
npm test
```

For local testing during development, the `test:dev:watch` command will run your tests in Lit's development mode (with verbose errors) on every change to your source files:

```bash
npm test:watch
```

Alternatively the `test:prod` and `test:prod:watch` commands will run your tests in Lit's production mode.

## Dev Server

This sample uses modern-web.dev's [@web/dev-server](https://www.npmjs.com/package/@web/dev-server) for previewing the project without additional build steps. Web Dev Server handles resolving Node-style "bare" import specifiers, which aren't supported in browsers. It also automatically transpiles JavaScript and adds polyfills to support older browsers. See [modern-web.dev's Web Dev Server documentation](https://modern-web.dev/docs/dev-server/overview/) for more information.

To run the dev server and open the project in a new browser tab:

```bash
npm run serve
```

There is a development HTML file located at `/dev/index.html` that you can view at http://localhost:8000/dev/index.html. Note that this command will serve your code using Lit's development mode (with more verbose errors). To serve your code against Lit's production mode, use `npm run serve:prod`.

## Editing

If you use VS Code, we highly recommend the [lit-plugin extension](https://marketplace.visualstudio.com/items?itemName=runem.lit-plugin), which enables some extremely useful features for lit-html templates:

- Syntax highlighting
- Type-checking
- Code completion
- Hover-over docs
- Jump to definition
- Linting
- Quick Fixes

The project is setup to recommend lit-plugin to VS Code users if they don't already have it installed.

## Linting

Linting of JavaScript files is provided by [ESLint](eslint.org). In addition, [lit-analyzer](https://www.npmjs.com/package/lit-analyzer) is used to type-check and lint lit-html templates with the same engine and rules as lit-plugin.

The rules are mostly the recommended rules from each project, but some have been turned off to make LitElement usage easier. The recommended rules are pretty strict, so you may want to relax them by editing `.eslintrc.json`.

To lint the project run:

```bash
npm run lint
```

## Formatting

[Prettier](https://prettier.io/) is used for code formatting. It has been pre-configured according to the Lit's style. You can change this in `.prettierrc.json`.

Prettier has not been configured to run when committing files, but this can be added with Husky and `pretty-quick`. See the [prettier.io](https://prettier.io/) site for instructions.

## Static Site

This project includes a simple website generated with the [eleventy](https://11ty.dev) static site generator and the templates and pages in `/docs-src`. The site is generated to `/docs` and intended to be checked in so that GitHub pages can serve the site [from `/docs` on the main branch](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

To enable the site go to the GitHub settings and change the GitHub Pages &quot;Source&quot; setting to &quot;main branch /docs folder&quot;.</p>

To build the site, run:

```bash
npm run docs
```

To serve the site locally, run:

```bash
npm run docs:serve
```

To watch the site files, and re-build automatically, run:

```bash
npm run docs:gen:watch
```

The site will usually be served at http://localhost:8000.

**Note**: The project uses Rollup to bundle and minify the source code for the docs site and not to publish to NPM. For bundling and minification, check the [Bundling and minification](#bundling-and-minification) section.

## Bundling and minification

As stated in the [static site generation](#static-site) section, the bundling and minification setup in the Rollup configuration in this project is there specifically for the docs generation.

We recommend publishing components as unoptimized JavaScript modules and performing build-time optimizations at the application level. This gives build tools the best chance to deduplicate code, remove dead code, and so on.

Please check the [Publishing best practices](https://lit.dev/docs/tools/publishing/#publishing-best-practices) for information on publishing reusable Web Components, and [Build for production](https://lit.dev/docs/tools/production/) for building application projects that include LitElement components, on the Lit site.

## More information

See [Get started](https://lit.dev/docs/getting-started/) on the Lit site for more information.
