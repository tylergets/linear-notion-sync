import {Command, ux} from '@oclif/core'
import {tokenFlags} from '../../flags/tokens'
import {clientsFromFlags} from '../../clients'

export default class World extends Command {
  static description = 'Get Linear Teams'

  static flags = {
    ...tokenFlags,
  }

  static args = {}

  async run(): Promise<void> {
    const {flags} = await this.parse(World)

    const clients = clientsFromFlags(flags)

    const linearTeams: Record<string, any>[] = await clients.linear.teams().then(r => r.nodes)

    ux.table(linearTeams, {
      id: {
        header: 'ID',
      },
      name: {},
    })
  }
}
