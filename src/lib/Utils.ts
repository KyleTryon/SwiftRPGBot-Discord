import { EmbedBuilder } from "discord.js";
import { SwiftRPGActionResponse } from "./SwiftClient.js";

export const generateActionMessage = <T>(title: string, description: string, data: SwiftRPGActionResponse<T>) => {
  const embed = new EmbedBuilder()
    .setColor("#f5bf42")
    .setTitle(title)
    .setDescription(description)
    .addFields({
      name: "XP",
      value: `${data.experience} [+ ${data.reward_xp}]`,
    })
    .addFields({
      name: `${data.reward.type}`,
      value: `${data.reward.total} [+${data.reward.quantity}]`,
    })
    .addFields({
      name: "Ticks",
      value: `${data.ticks} (${data.seconds_until_tick} sec) to go.`,
    });
  return embed;
} 
