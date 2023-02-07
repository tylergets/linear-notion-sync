import {Command, Flags} from '@oclif/core'
import {tokenFlags} from '../flags/tokens'
import {clientsFromFlags} from '../clients'
import {Issue} from '@linear/sdk'
import {markdownToBlocks, markdownToRichText} from '@tryfabric/martian'

export default class Setup extends Command {
  static description = 'Sync Linear issues to Notion Database'

  static examples = []

  static flags = {
    ...tokenFlags,
    linearTeam: Flags.string({description: 'Linear Team ID', required: true, env: 'LINEAR_TEAM', char: 't'}),
    notionDatabase: Flags.string({description: 'Notion Database ID', required: true, env: 'NOTION_DATABASE', char: 'n'}),
  }

  static args = {}

  async run(): Promise<void> {
    const {flags} = await this.parse(Setup)
    const {linear, notion} = clientsFromFlags(flags)

    const issues = await linear.issues({
      filter: {
        team: {
          id: {
            eq: flags.linearTeam,
          },
        },
      },
    })

    this.log('Loading Linear Issues')
    while (issues.pageInfo.hasNextPage) {
      await issues.fetchNext()
    }

    this.log(`Fetched ${issues.nodes.length} issues`)

    let i = 0
    for (const issue of issues.nodes) {
      i++
      this.log(`Syncing issue ${i} of ${issues.nodes.length} (${issue.identifier})`)

      // Check if issue already exists
      const existingPage = await notion.databases.query({
        database_id: flags.notionDatabase,
        filter: {
          property: 'Linear ID',
          rich_text: {
            equals: issue.id,
          },
        },
      })

      if (existingPage.results.length > 0) {
        this.log(`Issue ${issue.identifier} already exists in Notion, updating`)
        await notion.pages.update({
          page_id: existingPage.results[0].id,
          properties: await this.getProperties(issue),
        })
      } else {
        this.log(`Creating issue ${issue.identifier} in Notion`)
        await notion.pages.create({
          parent: {
            type: 'database_id',
            database_id: flags.notionDatabase,
          },
          children: markdownToBlocks(issue.description || 'No description'),
          properties: await this.getProperties(issue),
        })
      }
    }
  }

  private async getProperties(issue: Issue) {
    const status = await issue.state?.then((s: any) => s.name)
    const assignee = await issue.assignee?.then((s: any) => s.name)

    return {
      Title: {
        type: 'title',
        title: [
          {
            type: 'text',
            text: {
              content: issue.title,
            },
          },
        ],
      },
      'Linear ID': {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: issue.id,
            },
          },
        ],
      },
      'Linear Number': {
        type: 'rich_text',
        rich_text: [
          {
            type: 'text',
            text: {
              content: issue.identifier,
            },
          },
        ],
      },
      'Linear URL': {
        type: 'url',
        url: issue.url,
      },
      Status: {
        type: 'select',
        select: {
          name: status,
        },
      },
      Priority: {
        type: 'select',
        select: {
          name: issue.priorityLabel,
        },
      },
      ...assignee ? {
        Assignee: {
          type: 'select',
          select: {
            name: assignee,
          },
        },
      } : {},
      Labels: {
        type: 'multi_select',
        multi_select: (await issue.labels()).nodes.map((l: any) => {
          return {
            name: l.name,
          }
        }),
      },
    }
  }
}
