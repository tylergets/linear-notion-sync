linear-notion-sync
=================

A CLI tool to sync Linear issues to Notion pages.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->

<!-- tocstop -->

<!-- usage -->
```sh-session
$ npm install -g linear-notion-sync
$ linear-notion-sync COMMAND
running command...
$ linear-notion-sync (--version)
linear-notion-sync/0.0.0 linux-x64 node-v16.17.0
$ linear-notion-sync --help [COMMAND]
USAGE
  $ linear-notion-sync COMMAND
...
```
<!-- usagestop -->
<!-- commands -->
* [`linear-notion-sync help [COMMANDS]`](#linear-notion-sync-help-commands)
* [`linear-notion-sync linear teams`](#linear-notion-sync-linear-teams)
* [`linear-notion-sync setup`](#linear-notion-sync-setup)
* [`linear-notion-sync sync`](#linear-notion-sync-sync)
* [`linear-notion-sync test`](#linear-notion-sync-test)

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

## `linear-notion-sync linear teams`

Get Linear Teams

```
USAGE
  $ linear-notion-sync linear teams --linearToken <value> --notionToken <value>

FLAGS
  --linearToken=<value>  (required) Linear API Token
  --notionToken=<value>  (required) Notion API Token

DESCRIPTION
  Get Linear Teams
```

## `linear-notion-sync setup`

Setup Notion Database with Linear Template

```
USAGE
  $ linear-notion-sync setup --linearToken <value> --notionToken <value> -t <value> -n <value>

FLAGS
  -n, --notionPageId=<value>  (required) Notion Page ID to contain Database
  -t, --linearTeam=<value>    (required) Linear Team ID
  --linearToken=<value>       (required) Linear API Token
  --notionToken=<value>       (required) Notion API Token

DESCRIPTION
  Setup Notion Database with Linear Template
```

_See code: [dist/commands/setup.ts](https://github.com/tylergets/linear-notion-sync/blob/v0.0.0/dist/commands/setup.ts)_

## `linear-notion-sync sync`

Sync Linear issues to Notion Database

```
USAGE
  $ linear-notion-sync sync --linearToken <value> --notionToken <value> -t <value> -n <value>

FLAGS
  -n, --notionDatabase=<value>  (required) Notion Database ID
  -t, --linearTeam=<value>      (required) Linear Team ID
  --linearToken=<value>         (required) Linear API Token
  --notionToken=<value>         (required) Notion API Token

DESCRIPTION
  Sync Linear issues to Notion Database
```

_See code: [dist/commands/sync.ts](https://github.com/tylergets/linear-notion-sync/blob/v0.0.0/dist/commands/sync.ts)_

## `linear-notion-sync test`

Test Linear and Notion Connections

```
USAGE
  $ linear-notion-sync test --linearToken <value> --notionToken <value>

FLAGS
  --linearToken=<value>  (required) Linear API Token
  --notionToken=<value>  (required) Notion API Token

DESCRIPTION
  Test Linear and Notion Connections
```

_See code: [dist/commands/test.ts](https://github.com/tylergets/linear-notion-sync/blob/v0.0.0/dist/commands/test.ts)_
<!-- commandsstop -->
