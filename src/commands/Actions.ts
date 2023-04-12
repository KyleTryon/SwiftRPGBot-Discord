import {
  ActionRowBuilder,
  CommandInteraction,
  ModalBuilder,
  ModalSubmitInteraction,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { ModalComponent, SlashGroup, SlashOption } from "discordx";
import { Discord, Slash } from "discordx";
import { ApplicationCommandOptionType } from "discord.js";
import {
  SwiftClient,
  SwiftRPGActionErrorResponse,
  SwiftRPGActionResponse,
  SwiftRPGActionResponseLookPeople,
} from "../lib/SwiftClient.js";
import { generateActionMessage } from "../lib/Utils.js";
import { PrismaClient, User } from "@prisma/client";

const getAuthedClient = async (discordId: string) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      discordId: discordId,
    },
  });
  if (!user?.swiftToken) {
    throw new Error("User Not Registered");
  }
  return new SwiftClient(user.swiftToken);
};
@Discord()
@SlashGroup({ description: "Explore the map", name: "explore" })
@SlashGroup({ description: "Get a closer look", name: "look" })
@SlashGroup({ description: "Embark on a journey", name: "quest" })
export class Actions {
  @Slash({ description: "chop tree", name: "chop" })
  async chop(command: CommandInteraction): Promise<void> {
    try {
      const response = await(await getAuthedClient(command.user.id)).chop();
      const data = response.data as SwiftRPGActionResponse<unknown>;
      if (data.error) {
        command.reply(data.error);
        return;
      } else {
        command.reply({
          embeds: [
            generateActionMessage<unknown>(
              "🪓 Chop!",
              `@${command.user.username} chopped a tree!`,
              data
            ),
          ],
        });
      }
    } catch (e) {
      command.reply("Error: " + (e as Error).message);
    }
  }

  @SlashGroup("explore")
  @Slash({ description: "east" })
  async east(command: CommandInteraction): Promise<void> {
    try {
      const response =  await(await getAuthedClient(command.user.id)).explore("east");
      const data = response.data as SwiftRPGActionResponse<unknown>;
      command.reply({
        embeds: [ generateActionMessage<unknown>("🚶‍♂️Explore!", `@${command.user.username} explored to the east!`, data)]
      })
    } catch (e) {
      command.reply("Error: " + (e as Error).message);
    }
  }

  @SlashGroup("explore")
  @Slash({ description: "south" })
  async south(command: CommandInteraction): Promise<void> {
    try {
      const response = await(await getAuthedClient(command.user.id)).explore("south");
      const data = response.data as SwiftRPGActionResponse<unknown>;
      command.reply({
        embeds: [ generateActionMessage<unknown>("🚶‍♂️Explore!", `@${command.user.username} explored to the south!`, data)]
      })
    } catch (e) {
      command.reply("Error: " + (e as Error).message);
    }
  }

  @SlashGroup("explore")
  @Slash({ description: "west" })
  async west(command: CommandInteraction): Promise<void> {
    try {
      const response = await(await getAuthedClient(command.user.id)).explore("west");
      const data = response.data as SwiftRPGActionResponse<unknown>;
      command.reply({
        embeds: [ generateActionMessage<unknown>("🚶‍♂️Explore!", `@${command.user.username} explored to the west!`, data)]
      })
    } catch (e) {
      command.reply("Error: " + (e as Error).message);
    }
  
  }

  @SlashGroup("explore")
  @Slash({ description: "north" })
  async north(command: CommandInteraction): Promise<void> {
    try {
      const response = await(await getAuthedClient(command.user.id)).explore("north");
      const data = response.data as SwiftRPGActionResponse<unknown>;
      command.reply({
        embeds: [ generateActionMessage<unknown>("🚶‍♂️Explore!", `@${command.user.username} explored to the north!`, data)]
      })
    } catch (e) {
      command.reply("Error: " + (e as Error).message);
    }
  }

  @Slash({ description: "Pickpocket a citizen", name: "pickpocket" })
  async pickpocket(command: CommandInteraction): Promise<void> {
    try {
      const response = await(await getAuthedClient(command.user.id)).pickpocket();
      const data = response.data as SwiftRPGActionResponse<unknown>;
      command.reply({
        embeds: [ generateActionMessage<unknown>("🕵️ Pickpocket!", `@${command.user.username} pickpocketed a citizen!`, data)]
      })
    } catch (e) {
      command.reply("Error: " + (e as Error).message);
    }
  }

  @SlashGroup("look")
  @Slash({ description: "Look around the area" })
  async around(command: CommandInteraction): Promise<void> {
    try {
      const response = await(await getAuthedClient(command.user.id)).lookAround();
      const data = response.data as SwiftRPGActionResponse<unknown>;
      command.reply({
        embeds: [ generateActionMessage<unknown>("👀 Look!", `@${command.user.username} looked around!`, data)]
      })
    } catch (e) {
      command.reply("Error: " + (e as Error).message);
    }
  }

  @SlashGroup("look")
  @Slash({ description: "Inspect the people around you" })
  async people(command: CommandInteraction): Promise<void> {
    try {
      const response = await(await getAuthedClient(command.user.id)).lookPeople();
      const data = response.data as SwiftRPGActionResponse<unknown>;
      command.reply({
        embeds: [ generateActionMessage<unknown>("👀 Look!", `@${command.user.username} looked at people!`, data)]
      })
    } catch (e) {
      command.reply("Error: " + (e as Error).message);
    }
  }

  @SlashGroup("look")
  @Slash({ description: "Inspect the buildings around you" })
  async buildings(command: CommandInteraction): Promise<void> {
    try {
      const response = await(await getAuthedClient(command.user.id)).lookBuildings();
      const data = response.data as SwiftRPGActionResponse<unknown>;
      command.reply({
        embeds: [ generateActionMessage<unknown>("👀 Look!", `@${command.user.username} looked at buildings!`, data)]
      })
    } catch (e) {
      command.reply("Error: " + (e as Error).message);
    }
  }

  @SlashGroup("look")
  @Slash({ description: "Inspect an individual" })
  async person(
    @SlashOption({
      description: "The person to inspect",
      name: "person",
      required: true,
      type: ApplicationCommandOptionType.Number,
    })
    person: number,
    command: CommandInteraction
  ): Promise<void> {
    try {
      const response = await(await getAuthedClient(command.user.id)).lookPeople();
      const data = response.data as SwiftRPGActionResponse<unknown>;
      command.reply({
        embeds: [ generateActionMessage<unknown>("👀 Look!", `@${command.user.username} looked at person ${person}!`, data)]
      })
    } catch (e) {
      command.reply("Error: " + (e as Error).message);
    }
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
  list(command: CommandInteraction): void {
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

  @Slash({ description: "Convert level to XP", name: "experience" })
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

  @Slash({ description: "SwiftRPG Login" })
  login(interaction: CommandInteraction): void {
    // Create the modal
    const modal = new ModalBuilder()
      .setTitle("My Awesome Form")
      .setCustomId("LoginForm");

    // Create text input fields
    const tokenInputComponent = new TextInputBuilder()
      .setCustomId("tokenField")
      .setLabel("Enter your Temporary Token")
      .setStyle(TextInputStyle.Short)
      .setMaxLength(64)
      .setMinLength(20);

    const textComponent = new TextInputBuilder()
      .setCustomId("registerLint")
      .setLabel("Register here:")
      .setStyle(TextInputStyle.Short)
      .setPlaceholder("https://swiftrpg.com/user")
      .setMaxLength(1)
      .setMinLength(1)
      .setRequired(false);

    const row1 = new ActionRowBuilder<TextInputBuilder>().addComponents(
      tokenInputComponent
    );
    const row2 = new ActionRowBuilder<TextInputBuilder>().addComponents(
      textComponent
    );

    // Add action rows to form
    modal.addComponents(row2, row1);

    // --- snip ---

    // Present the modal to the user
    interaction.showModal(modal);
  }

  @ModalComponent()
  async LoginForm(interaction: ModalSubmitInteraction): Promise<void> {
    const [tokenField] = ["tokenField"].map((id) =>
      interaction.fields.getTextInputValue(id)
    );
    try {
      await new SwiftClient(tokenField).login(interaction.user.id, tokenField);
      await interaction.reply(`You logged in!`);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `Login failed: ${(error as Error).message ?? error}`
      );
    }
    return;
  }
}
