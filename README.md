<img src="https://user-images.githubusercontent.com/98138701/169650464-ac7e1d8a-0050-4368-9331-2b3645cfc994.png" width="276px"/>

A Github action for checking .yaml files using JSON schemas

[![Build](https://github.com/thiagodonferreira/yaml-schema-checker/actions/workflows/build.yml/badge.svg)](https://github.com/thiagodonferreira/yaml-schema-checker/actions/workflows/build.yml)
[![GitHub Release](https://img.shields.io/github/release/thiagodonferreira/yaml-schema-checker.svg)](https://github.com/thiagodonferreira/yaml-schema-checker/releases/latest)
[![GitHub contributors](https://img.shields.io/github/contributors/thiagodonferreira/yaml-schema-checker.svg)](https://github.com/thiagodonferreira/yaml-schema-checker/graphs/contributors)
[![GitHub stars](https://img.shields.io/github/stars/thiagodonferreira/yaml-schema-checker.svg)](https://github.com/thiagodonferreira/yaml-schema-checker)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

## Usage

You can now consume the action by referencing the available version.

```yaml
uses: thiagodonferreira/yaml-schema-checker@0.0.4
with:
  jsonSchemaFile: schemas/example.schema.json
  yamlFiles: folder/subfolder/**/*.yml
```

## Output

```bash
Run thiagodonferreira/yaml-schema-checker@main
Json Schema: schemas/example.schema.json
Yaml Files: folder/subfolder/**/*.yml
Found 4 file(s). Checking them:
❌ data/deadlines/events/fake1.yml
    - instance.type is not one of enum values: conference,workshop,symposium
✅ data/deadlines/events/fake2.yml
❌ data/deadlines/events/fake3.yml
    - instance.id is not of a type(s) string
    - instance.type is not one of enum values: conference,workshop,symposium
❌ data/deadlines/events/fake4.yml
    - instance.title is not of a type(s) string
Done. All files checked

Error: It was found 3 invalid file(s)
```

## For Developers

Install the dependencies

```bash
npm install
```

Run the development enviroment

```bash
npm run dev
```

## Questions or Suggestions

Feel free to access the <a href="../../discussions">discussions tab</a> as you need

## Contribute

Contributions to the this project are very welcome! We can't do this alone! Feel free to fork this project, work on it and then make a pull request.

## License

Licensed under the [MIT license](LICENSE).

## Donate

I open-source almost everything I can, and I try to reply to everyone needing help using these projects. Obviously, this takes time. You can integrate and use these projects in your applications for free! You can even change the source code and redistribute (even resell it).

However, if you get some profit from this or just want to encourage me to continue creating stuff, reach out to me if you want to do it.

Thanks!

❤️
