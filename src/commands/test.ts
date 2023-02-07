import {Command} from '@oclif/core'
import {tokenFlags} from '../flags/tokens'
import {clientsFromFlags} from '../clients'

export default class Test extends Command {
  static description = 'Test Linear and Notion Connections'

  static flags = {
    ...tokenFlags,
  }

  static args = {}

  async run(): Promise<void> {
    const {flags} = await this.parse(Test)

    const clients = clientsFromFlags(flags)

    const linearUsers = await clients.linear.users().then(r => r.nodes)
    this.log(`Linear Users: ${linearUsers.length}`)

    const notionUsers = await clients.notion.users.list()
    this.log(`Notion Users: ${notionUsers.results.length}`)
  }
}
