oclif-hello-world
=================

oclif example Hello World CLI

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g linear-notion-sync
$ linear-notion-sync COMMAND
running command...
$ linear-notion-sync (--version)
linear-notion-sync/0.0.0 linux-x64 node-v18.12.1
$ linear-notion-sync --help [COMMAND]
USAGE
  $ linear-notion-sync COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`linear-notion-sync hello PERSON`](#linear-notion-sync-hello-person)
* [`linear-notion-sync hello world`](#linear-notion-sync-hello-world)
* [`linear-notion-sync help [COMMANDS]`](#linear-notion-sync-help-commands)
* [`linear-notion-sync plugins`](#linear-notion-sync-plugins)
* [`linear-notion-sync plugins:install PLUGIN...`](#linear-notion-sync-pluginsinstall-plugin)
* [`linear-notion-sync plugins:inspect PLUGIN...`](#linear-notion-sync-pluginsinspect-plugin)
* [`linear-notion-sync plugins:install PLUGIN...`](#linear-notion-sync-pluginsinstall-plugin-1)
* [`linear-notion-sync plugins:link PLUGIN`](#linear-notion-sync-pluginslink-plugin)
* [`linear-notion-sync plugins:uninstall PLUGIN...`](#linear-notion-sync-pluginsuninstall-plugin)
* [`linear-notion-sync plugins:uninstall PLUGIN...`](#linear-notion-sync-pluginsuninstall-plugin-1)
* [`linear-notion-sync plugins:uninstall PLUGIN...`](#linear-notion-sync-pluginsuninstall-plugin-2)
* [`linear-notion-sync plugins update`](#linear-notion-sync-plugins-update)

## `linear-notion-sync hello PERSON`

Say hello

```
USAGE
  $ linear-notion-sync hello [PERSON] -f <value>

ARGUMENTS
  PERSON  Person to say hello to

FLAGS
  -f, --from=<value>  (required) Who is saying hello

DESCRIPTION
  Say hello

EXAMPLES
  $ oex hello friend --from oclif
  hello friend from oclif! (./src/commands/hello/index.ts)
```

_See code: [dist/commands/hello/index.ts](https://github.com/tylergets/hello-world/blob/v0.0.0/dist/commands/hello/index.ts)_

## `linear-notion-sync hello world`

Say hello world

```
USAGE
  $ linear-notion-sync hello world

DESCRIPTION
  Say hello world

EXAMPLES
  $ linear-notion-sync hello world
  hello world! (./src/commands/hello/world.ts)
```

## `linear-notion-sync help [COMMANDS]`

Display help for linear-notion-sync.

```
USAGE
  $ linear-notion-sync help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for linear-notion-sync.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.2/src/commands/help.ts)_

## `linear-notion-sync plugins`

List installed plugins.

```
USAGE
  $ linear-notion-sync plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ linear-notion-sync plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.3.0/src/commands/plugins/index.ts)_

## `linear-notion-sync plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ linear-notion-sync plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ linear-notion-sync plugins add

EXAMPLES
  $ linear-notion-sync plugins:install myplugin 

  $ linear-notion-sync plugins:install https://github.com/someuser/someplugin

  $ linear-notion-sync plugins:install someuser/someplugin
```

## `linear-notion-sync plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ linear-notion-sync plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ linear-notion-sync plugins:inspect myplugin
```

## `linear-notion-sync plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ linear-notion-sync plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ linear-notion-sync plugins add

EXAMPLES
  $ linear-notion-sync plugins:install myplugin 

  $ linear-notion-sync plugins:install https://github.com/someuser/someplugin

  $ linear-notion-sync plugins:install someuser/someplugin
```

## `linear-notion-sync plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ linear-notion-sync plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ linear-notion-sync plugins:link myplugin
```

## `linear-notion-sync plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ linear-notion-sync plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ linear-notion-sync plugins unlink
  $ linear-notion-sync plugins remove
```

## `linear-notion-sync plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ linear-notion-sync plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ linear-notion-sync plugins unlink
  $ linear-notion-sync plugins remove
```

## `linear-notion-sync plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ linear-notion-sync plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ linear-notion-sync plugins unlink
  $ linear-notion-sync plugins remove
```

## `linear-notion-sync plugins update`

Update installed plugins.

```
USAGE
  $ linear-notion-sync plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```
<!-- commandsstop -->
