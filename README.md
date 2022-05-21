<img src="https://user-images.githubusercontent.com/98138701/169650464-ac7e1d8a-0050-4368-9331-2b3645cfc994.png" width="276px"/>

A Github action for checking .yaml files using JSON schemas

[![Build](https://github.com/thiagodonferreira/yaml-schema-checker/actions/workflows/build.yml/badge.svg)](https://github.com/thiagodonferreira/yaml-schema-checker/actions/workflows/build.yml)
[![GitHub Release](https://img.shields.io/github/release/thiagodonferreira/yaml-schema-checker.svg)](https://github.com/thiagodonferreira/yaml-schema-checker/releases/latest)
[![GitHub contributors](https://img.shields.io/github/contributors/thiagodonferreira/yaml-schema-checker.svg)](https://github.com/thiagodonferreira/yaml-schema-checker/graphs/contributors)
[![GitHub stars](https://img.shields.io/github/stars/thiagodonferreira/yaml-schema-checker.svg)](https://github.com/thiagodonferreira/yaml-schema-checker)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

# Usage

You can now consume the action by referencing the available version.

```yaml
uses: thiagodonferreira/yaml-schema-checker@0.0.4
with:
  jsonSchemaFile: schemas/example.schema.json
  yamlFiles: folder/subfolder/**/*.yml
```


# Create a JavaScript Action

<p align="center">
  <a href="https://github.com/actions/javascript-action/actions"><img alt="javscript-action status" src="https://github.com/actions/javascript-action/workflows/units-test/badge.svg"></a>
</p>

Use this template to bootstrap the creation of a JavaScript action.:rocket:

This template includes tests, linting, a validation workflow, publishing, and versioning guidance.

If you are new, there's also a simpler introduction.  See the [Hello World JavaScript Action](https://github.com/actions/hello-world-javascript-action)

## Create an action from this template

Click the `Use this Template` and provide the new repo details for your action

## Code in Main

Install the dependencies

```bash
npm install
```

Run the tests :heavy_check_mark:

```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)
...
```

## Change action.yml

The action.yml defines the inputs and output for your action.

Update the action.yml with your name, description, inputs and outputs for your action.

See the [documentation](https://help.github.com/en/articles/metadata-syntax-for-github-actions)

## Change the Code

Most toolkit and CI/CD operations involve async operations so the action is run in an async function.

```javascript
const core = require('@actions/core');
...

async function run() {
  try {
      ...
  }
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
```

See the [toolkit documentation](https://github.com/actions/toolkit/blob/master/README.md#packages) for the various packages.

## Package for distribution

GitHub Actions will run the entry point from the action.yml. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos.  Packaging the action will create a packaged action in the dist folder.

Run prepare

```bash
npm run prepare
```

Since the packaged index.js is run from the dist folder.

```bash
git add dist
```

## Create a release branch

Users shouldn't consume the action from master since that would be latest code and actions can break compatibility between major versions.

Checkin to the v1 release branch

```bash
git checkout -b v1
git commit -a -m "v1 release"
```

```bash
git push origin v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)


# For Developers

# Questions or Suggestions

Feel free to access the <a href="../../discussions">discussions tab</a> as you need

# Contribute

Contributions to the this project are very welcome! We can't do this alone! Feel free to fork this project, work on it and then make a pull request.


# License

Licensed under the [MIT license](LICENSE).

# Donate

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously, this takes time. You can integrate and use these projects in your applications for free! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, reach out to me if you want to do it.

Thanks!

❤️
