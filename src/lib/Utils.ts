import { CommandInteraction, EmbedBuilder } from "discord.js";
import {
  SwiftRPGActionResponse,
  SwiftRPGActionResponseMetaExplore,
  SwiftRPGActionResponseMetaLookAround,
} from "./SwiftClient.js";

export const generateActionMessage = <T>(
  command: string,
  interaction: CommandInteraction,
  data: SwiftRPGActionResponse<T>
) => {
  const embed = new EmbedBuilder()
    .setColor("#6ac955")
    .addFields({
      name: "XP",
      value: `${data.experience || 0} [**+**${data.reward.experience || 0}]`,
    })
    .addFields({
      name: "Ticks",
      value: `${data.ticks || 0} (${data.seconds_until_tick || 0} sec) to go.`,
    });

  if (data.reward.loot.length > 0) {
    data.reward.loot.forEach((item) => {
      const isPositive = Math.sign(item.quantity) === 1;
      embed.addFields({
        name: `${item.name || "none"}`,
        value: `${item.total || 0} [**${isPositive ? '+' : ''}${item.quantity || 0}**]`,
      });
    });
  }

  switch (command) {
    case "chop": {
      embed.setTitle("🪓 Chop!");
      embed.setDescription(
        `@${interaction.user.username} begins chopping a tree.`
      );
      break;
    }
    case "burn": {
      embed.setTitle("🔥 Burn!");
      embed.setDescription(
        `@${interaction.user.username} begins burning a log, making a warm fire.`
      );
      break;
    }
    case "north": {
      const typedData =
        data as SwiftRPGActionResponse<SwiftRPGActionResponseMetaExplore>;
      embed.setTitle("🚶‍♂️ Explore!");
      embed.setDescription(
        `@${interaction.user.username} is exploring to the north!`
      );
      embed.addFields({
        name: "**Discovered By**",
        value: `${typedData.metadata.discovered_by.name}` ?? "Unexplored",
      });
      embed.addFields({
        name: "**Location**",
        value: `(${typedData.metadata.x}, ${typedData.metadata.y})`,
      });
      embed.addFields({
        name: `**Terrain: ${typedData.metadata.terrain.name}**`,
        value: `${typedData.metadata.terrain.description}`,
      });
      break;
    }
    case "south": {
      const typedData =
        data as SwiftRPGActionResponse<SwiftRPGActionResponseMetaExplore>;
      embed.setTitle("🚶‍♂️ Explore!");
      embed.setDescription(
        `@${interaction.user.username} is exploring to the south!`
      );
      embed.addFields({
        name: "**Discovered By**",
        value: `${typedData.metadata.discovered_by.name}` ?? "Unexplored",
      });
      embed.addFields({
        name: "**Location**",
        value: `(${typedData.metadata.x}, ${typedData.metadata.y})`,
      });
      embed.addFields({
        name: `**Terrain: ${typedData.metadata.terrain.name}**`,
        value: `${typedData.metadata.terrain.description}`,
      });
      break;
    }
    case "east": {
      const typedData =
        data as SwiftRPGActionResponse<SwiftRPGActionResponseMetaExplore>;
      embed.setTitle("🚶‍♂️ Explore!");
      embed.setDescription(
        `@${interaction.user.username} is exploring to the east!`
      );
      embed.addFields({
        name: "**Discovered By**",
        value: `${typedData.metadata.discovered_by.name}` ?? "Unexplored",
      });
      embed.addFields({
        name: "**Location**",
        value: `(${typedData.metadata.x}, ${typedData.metadata.y})`,
      });
      embed.addFields({
        name: `**Terrain: ${typedData.metadata.terrain.name}**`,
        value: `${typedData.metadata.terrain.description}`,
      });
      break;
    }
    case "west": {
      const typedData =
        data as SwiftRPGActionResponse<SwiftRPGActionResponseMetaExplore>;
      embed.setTitle("🚶‍♂️ Explore!");
      embed.setDescription(
        `@${interaction.user.username} is exploring to the west!`
      );
      embed.addFields({
        name: "Discovered By",
        value: `${typedData.metadata.discovered_by.name}` ?? "Unexplored",
      });
      embed.addFields({
        name: "Location",
        value: `(${typedData.metadata.x}, ${typedData.metadata.y})`,
      });
      embed.addFields({
        name: `**Terrain: ${typedData.metadata.terrain.name}**`,
        value: `${typedData.metadata.terrain.description}`,
      });
      break;
    }
    case "pickpocket": {
      embed.setTitle("🕵️ Pickpocket!");
      embed.setDescription(
        `@${interaction.user.username} begins to pickpocket an unsuspecting mark.`
      );
      break;
    }
    case "lookAround":
    case "lookDirection": {
      embed.setTitle("👀 Look Around!");
      embed.setDescription(
        `@${interaction.user.username} looks around for a bit.`
      );
      const typedData =
        data as SwiftRPGActionResponse<SwiftRPGActionResponseMetaLookAround>;
      embed.addFields({
        name: `**Terrain: ${typedData.metadata.terrain.name}**`,
        value: `${typedData.metadata.terrain.description}`,
      });
      embed.addFields({
        name: "**Discovered By**",
        value: `${typedData.metadata.discovered_by.name}` ?? "Unexplored",
      });
      embed.addFields({
        name: "**Location**",
        value: `(${typedData.metadata.x}, ${typedData.metadata.y})`,
      });
      embed.addFields({
        name: "**🌲 Trees**",
        value: `${typedData.metadata.available_trees}/${typedData.metadata.max_trees}`,
      });
      break;
    }
  }

  return { embeds: [embed] };
};

export const generateActionMessageError = (message: string) => {
  const embed = new EmbedBuilder()
    .setColor("#b02c12")
    .setTitle("Error")
    .setDescription(`_${message}_`);
  return { embeds: [embed], ephemeral: true };
};
