import { APIApplicationCommandInteraction, APIInteractionResponse, RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types/v10'

export interface Command {
  data: RESTPostAPIApplicationCommandsJSONBody
  execute: (interaction: APIApplicationCommandInteraction) => Promise<APIInteractionResponse>
}
