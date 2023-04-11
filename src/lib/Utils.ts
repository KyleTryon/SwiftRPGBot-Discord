import { SwiftRPGActionResponse } from "./SwiftClient.js";

export const generateActionMessage = (action: string, meta: SwiftRPGActionResponse): string => {
  return `${action}! | XP: ${meta.experience} [+ ${meta.reward_xp}] | ${meta.reward.type}: ${meta.reward.total} [+${meta.reward.quantity}}] | Ticks: ${meta.ticks} (${meta.seconds_until_tick} sec) to go.`;
}