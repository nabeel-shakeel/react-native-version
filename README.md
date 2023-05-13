# React Native Version
A Composite GitHub Action for version bump in package.json, respective Android and iOS files along with generating GitHub release. 

## Working
Version bump in package.json, iOS, and Android config-related files is an important step in the `react-native` CI/CD pipeline. This action is composed of the following steps: 

- `paramsinghvc/gh-action-bump-version@master` - Based on the commit messages, it increments the version in package.json
- `npx react-native-version` - This command sync the latest version in iOS and Android build/config files
- `EndBug/add-and-commit@v9` - Commit changes made in your workflow run directly to your repo
- `marvinpinto/action-automatic-releases@latest` - Generate a new release by automatically uploading assets, generating changelogs, handling pre-releases, and so on.

## Usage
You can look at the repo [react-native-sample-app](https://github.com/nabeel-shakeel/react-native-sample-app) to see this action working. The workflow kicks in when changes are pushed to `main`, but you can configure the event trigger yourself. Next is to checkout the code, setup node, install yarn (if you are using it), then install node_modules, and lastly call `nabeel-shakeel/react-native-version` action with the required input `GITHUB_SECRET`. 

You can provide all the inputs supported by the packaged actions as json in `supported_parameters`. In this example, we have used `tag-prefix, tag-suffix` input provided by `paramsinghvc/gh-action-bump-version` action and `automatic_release_tag` provided by `marvinpinto/action-automatic-releases`

```yml
name: Version Bump and GitHub Release

on:
  push:
    branches:
      - main

jobs:
  version-bump:
    name: Version bump of app
    runs-on: ubuntu-latest

    steps:
      - name: Code Checkout
        uses: actions/checkout@v3

      - name: Use Node.js 18
        uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'yarn'

      - name: Install yarn
        run: npm install -g yarn

      - name: Install node_modules
        run: yarn ci

      - name: Version bump and publish release
        uses: nabeel-shakeel/react-native-version@main
        with:
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          supported_parameters: '{"tag-prefix":"v", "tag-suffix":"-staged", "automatic_release_tag":"latest_release"}'
```

## Packaged Actions
This action is composed of the following actions
- `paramsinghvc/gh-action-bump-version@master`
- `EndBug/add-and-commit@v9`
- `marvinpinto/action-automatic-releases@latest`

All these actions provide their set of parameters. Right now we support the following parameters

| Parameter                 | Packaged Action                                                    |
| ------------------------- | ------------------------------------------------------------------ |
| `tag-prefix, tag-suffix`  | Provided by `paramsinghvc/gh-action-bump-version` action           |
| `automatic_release_tag`   | Provided by `marvinpinto/action-automatic-releases@latest` action  | 
| `message`                 | Provided by `EndBug/add-and-commit@v9` action                      | 


## Supported Parameters
| Parameter               | Description                                                | Default  |
| ----------------------- | ---------------------------------------------------------- | -------- |
| `repo_token`\*\*        | GitHub Action token, e.g. `"${{ secrets.GITHUB_TOKEN }}"`. | `null`   |
| `supported_parameters`  | json of options listed in Packaed Actions section          | `null`   |


## Event Triggers
The GitHub Actions framework allows you to trigger this (and other) actions on many combinations of events. In context of `react-native` CI/CD pipeline, you can use

- Trigger CI/CD flow when changes land in the production branch
```yml
on:
  push:
    branches:
      - production
```

- Trigger CI/CD flow when a new tag push in the repo
```yml
on:
  push:
    tags:
      - "v*"
```

## License
The source code for this project is released under the [Apache-2.0 license](./LICENSE).