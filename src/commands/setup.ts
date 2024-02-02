import {Args, Command, Flags} from '@oclif/core'
import {tokenFlags} from '../flags/tokens'
import {clientsFromFlags} from '../clients'

export default class Setup extends Command {
  static description = 'Setup Notion Database with Linear Template'

  static examples = []

  static flags = {
    ...tokenFlags,
    linearTeam: Flags.string({description: 'Linear Team ID', required: true, env: 'LINEAR_TEAM', char: 't'}),
    notionPageId: Flags.string({description: 'Notion Page ID to contain Database', required: true, env: 'NOTION_PAGE', char: 'n'}),
  }

  static args = {}

  async run(): Promise<void> {
    const {flags} = await this.parse(Setup)
    const {notion, linear} = clientsFromFlags(flags)

    const pageId = flags.notionPageId

    const team = await linear.team(flags.linearTeam)

    // Setup Notion Page
    const response = await notion.databases.create({
      description: [
        {
          type: 'text',
          text: {
            content: 'Default Linear Issues Database -- Created by Linear Notion Sync',
          },
        },
      ],
      icon: {
        type: 'emoji',
        emoji: '📋',
      },
      title: [
        {
          type: 'text',
          text: {
            content: 'Linear Issues',
            link: null,
          },
        },
      ],
      parent: {
        type: 'page_id',
        page_id: pageId,
      },
      properties: {
        Title: {
          title: {},
        },
        'Linear ID': {
          rich_text: {},
        },
        'Linear Number': {
          rich_text: {},
        },
        'Linear URL': {
          url: {},
        },
        Status: {
          select: {
            options: (await team.states()).nodes.map(label => {
              return {
                name: label.name,
              }
            }),
          },
        },
        Project: {
          rich_text: {},
        },
        Priority: {
          select: {
            options: [
              {
                name: 'Urgent',
              },
              {
                name: 'High',
              },
              {
                name: 'Medium',
              },
              {
                name: 'Low',
              },
            ],
          },
        },
        Assignee: {
          select: {
            options: (await linear.users()).nodes.map(user => {
              return {
                name: user.name,
              }
            }),
          },
        },
        Labels: {
          multi_select: {
            options: (await team.labels()).nodes.map((label: any) => {
              return {
                name: label.name,
              }
            }),
          },
        },
        Created: {
          created_time: {},
        },
        Updated: {
          last_edited_time: {},
        },
      },
    })

    this.log(`Created Notion Database: ${response.id}`)
    this.log('View here: ' + response.url)
  }
}
