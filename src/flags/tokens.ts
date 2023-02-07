import {Flags} from '@oclif/core'

export const tokenFlags = {
  linearToken: Flags.string({description: 'Linear API Token', required: true, env: 'LINEAR_TOKEN'}),
  notionToken: Flags.string({description: 'Notion API Token', required: true, env: 'NOTION_TOKEN'}),
}
