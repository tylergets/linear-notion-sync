import {Command, Flags} from '@oclif/core'
import {tokenFlags} from '../flags/tokens'
import {LinearNotionSync} from '../sync/sync'

export default class Sync extends Command {
  static description = 'Sync Linear issues to Notion Database'

  static examples = []

  static flags = {
    ...tokenFlags,
    linearTeam: Flags.string({description: 'Linear Team ID', required: true, env: 'LINEAR_TEAM', char: 't'}),
    notionDatabase: Flags.string({description: 'Notion Database ID', required: true, env: 'NOTION_DATABASE', char: 'n'}),
    slow: Flags.boolean({description: 'Slow down sync to avoid rate limits', required: false, default: false, char: 's'}),
  }

  static args = {}

  async run(): Promise<void> {
    const {flags} = await this.parse(Sync)

    const syncClient = new LinearNotionSync({
      linearToken: flags.linearToken,
      linearTeam: flags.linearTeam,
      notionToken: flags.notionToken,
      notionDatabase: flags.notionDatabase,
      slow: flags.slow,
      log: (log: string) => this.log(log),
    })

    await syncClient.sync()
  }
}
