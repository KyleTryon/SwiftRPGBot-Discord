import type { CommandInteraction } from "discord.js";
import { SlashGroup, SlashOption } from "discordx";
import { Discord, Slash } from "discordx";
import { ApplicationCommandOptionType } from "discord.js";
import { SwiftClient, SwiftRPGActionErrorResponse, SwiftRPGActionResponse } from "../lib/SwiftClient.js";
import { generateActionMessage } from "../lib/Utils.js";

@Discord()
@SlashGroup({ description: "Explore the map", name: "explore" })
@SlashGroup({ description: "Get a closer look", name: "look" })
@SlashGroup({ description: "Embark on a journey", name: "quest" })
export class Actions {
  @Slash({ description: "chop tree", name: "chop" })
  async chop(command: CommandInteraction): Promise<void> {
    const response = await new SwiftClient(process.env.TEST_AUTH as string).chop();
    if (response.status === 200) {
      const data = response.data as SwiftRPGActionResponse;
      command.reply(generateActionMessage("🪓 Chopped a tree", data));
    } else {
      command.reply(`Error: ${(response.data as SwiftRPGActionErrorResponse).error}`);
    }
  }

  @SlashGroup("explore")
  @Slash({ description: "east" })
  east(command: CommandInteraction): void {
    command.reply(`${command.user} went east!`);
  }

  @SlashGroup("explore")
  @Slash({ description: "south" })
  south(command: CommandInteraction): void {
    command.reply(`${command.user} went south!`);
  }

  @SlashGroup("explore")
  @Slash({ description: "west" })
  west(command: CommandInteraction): void {
    command.reply(`${command.user} went west!`);
  }

  @SlashGroup("explore")
  @Slash({ description: "north" })
  north(command: CommandInteraction): void {
    command.reply(`${command.user} went north!`);
  }

  @Slash({ description: "Pickpocket a citizen", name: "pickpocket" })
  pickpocket(command: CommandInteraction): void {
    command.reply(`${command.user} pick-pocketed a citizen! Naughty!`);
  }

  @SlashGroup("look")
  @Slash({ description: "Look around the area" })
  around(command: CommandInteraction): void {
    command.reply(`${command.user} looked around!`);
  }

  @SlashGroup("look")
  @Slash({ description: "Inspect the people around you" })
  people(command: CommandInteraction): void {
    command.reply(`${command.user} looked at the people around them!`);
  }

  @SlashGroup("look")
  @Slash({ description: "Inspect the buildings around you" })
  buildings(command: CommandInteraction): void {
    command.reply(`${command.user} looked at the buildings around them!`);
  }

  @SlashGroup("look")
  @Slash({ description: "Inspect an individual" })
  person(
    @SlashOption({
      description: "The person to inspect",
      name: "person",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    person: number,
    command: CommandInteraction
  ): void {
    command.reply(`${command.user} looked at ${person}!`);
  }

  @SlashGroup("quest")
  @Slash({ description: "Go on a quest" })
  start(
    @SlashOption({
      description: "Quest ID",
      name: "id",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    id: number,
    @SlashOption({
      description: "Step ID",
      name: "step",
      required: false,
      type: ApplicationCommandOptionType.Number,
    })
    step: number,
    command: CommandInteraction
  ): void {
    command.reply(
      `${command.user} went on a quest! quest id: ${id} step: ${step}`
    );
  }

  @SlashGroup("quest")
  @Slash({ description: "Inspect the quest" })
  inspect(
    @SlashOption({
      description: "Quest ID",
      name: "id",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    id: number,
    command: CommandInteraction
  ): void {
    command.reply(`${command.user} inspected a quest! quest id: ${id}`);
  }

  @SlashGroup("quest")
  @Slash({ description: "View available quests" })
  list(
    command: CommandInteraction
  ): void {
    command.reply(`${command.user} requested a list of quests!`);
  }

  @Slash({ description: "Get your current status", name: "status" })
  status(command: CommandInteraction): void {
    command.reply(`${command.user} is currently checking their status!`);
  }

  @Slash({ description: "Get stats for you or another player", name: "stats" })
  stats(
    @SlashOption({
      description: "The player to inspect",
      name: "player",
      required: false,
      type: ApplicationCommandOptionType.Number,
    })
    player: number,
    command: CommandInteraction
  ): void {
    command.reply(
      `${command.user} checked ${player ? player + "'s" : "their"} stats!`
    );
  }

  @Slash({ description: "Convert XP to level", name: "level" })
  level(
    @SlashOption({
      description: "The amount of XP to convert",
      name: "xp",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    xp: number,
    command: CommandInteraction
  ): void {
    command.reply(`${command.user} converted ${xp} XP to level!`);
  }

  @Slash({ description: "Convert level to XP", name: "level" })
  experience(
    @SlashOption({
      description: "The level to convert",
      name: "level",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    level: number,
    command: CommandInteraction
  ): void {
    command.reply(`${command.user} converted level ${level} to XP!`);
  }

  @Slash({description: "login", name: "login"})
  login(command: CommandInteraction): void {
    command.reply(`${command.user} logged in!`);
  } 

}
