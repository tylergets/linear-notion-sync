import {clientsFromFlags} from '../clients'
import {markdownToBlocks} from '@tryfabric/martian'
import {Issue, WorkflowState} from '@linear/sdk'

export default interface SyncOptions {
  linearToken: string,
  linearTeam: string,
  notionToken: string,
  notionDatabase: string,
  slow: boolean,
  log?: (log: string) => void,
}

export class LinearNotionSync {
  options: SyncOptions;

  constructor(options: SyncOptions) {
    this.options = options
  }

  private async getProperties(issue: Issue, state: WorkflowState) {
    const statusName = state?.name
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
          name: statusName,
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

  log(...msg: string[]): void {
    if (this.options.log) {
      this.options.log(msg[0])
    } else {
      console.log(msg)
    }
  }

  async sync(): Promise<boolean> {
    this.log('Syncing Linear issues to Notion Database')

    const {linear, notion} = clientsFromFlags({
      linearToken: this.options.linearToken,
      notionToken: this.options.notionToken,
    })

    if (this.options.slow) {
      this.log('Slow mode enabled, this may take a while')
    }

    const issues = await linear.issues({
      filter: {
        team: {
          id: {
            eq: this.options.linearTeam,
          },
        },
      },
    })

    this.log('Loading Linear Issues')
    while (issues.pageInfo.hasNextPage) {
      await issues.fetchNext()
      await new Promise(resolve => setTimeout(resolve, this.options.slow ? 1000 : 0))
    }

    this.log(`Fetched ${issues.nodes.length} issues`)

    let i = 0
    for (const issue of issues.nodes) {
      await new Promise(resolve => setTimeout(resolve, this.options.slow ? 1000 : 0))

      i++
      const state = await issue.state!

      this.log(`Syncing issue ${i} of ${issues.nodes.length} (${issue.identifier}) - ${state.name} (${state.type})`)

      // Check if issue already exists
      const existingPage = await notion.databases.query({
        database_id: this.options.notionDatabase,
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
          properties: await this.getProperties(issue, state),
        })
      } else {
        this.log(`Creating issue ${issue.identifier} in Notion`)

        await notion.pages.create({
          parent: {
            type: 'database_id',
            database_id: this.options.notionDatabase,
          },
          children: markdownToBlocks(issue.description || 'No description'),
          properties: await this.getProperties(issue, state),
        })
      }
    }

    return true
  }
}
