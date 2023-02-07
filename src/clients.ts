import {LinearClient} from '@linear/sdk'
const {Client} = require('@notionhq/client')

export function clientsFromFlags(flags: any) {
  return {
    linear: new LinearClient({
      apiKey: flags.linearToken,
    }),
    notion: new Client({
      auth: flags.notionToken,
    }),
  }
}
