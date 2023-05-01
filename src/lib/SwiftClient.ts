import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";
import { PrismaClient, User } from "@prisma/client";
export class SwiftClient {
  config: AxiosRequestConfig;
  client: AxiosInstance;
  constructor(auth: string) {
    this.config = {
      baseURL: process.env.SWIFT_URL,
      headers: {
        "X-Bot-Token": process.env.X_BOT_TOKEN,
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
    };
    this.client = axios.create(this.config);
  }

  chop(): AxiosPromise<SwiftRPGActionResponse<unknown>> {
    return this.client.post("/woodcutting/chop");
  }

  burn(): AxiosPromise<SwiftRPGActionResponse<unknown>> {
    return this.client.post("/firemaking/burn");
  }

  explore(direction: string): AxiosPromise<SwiftRPGActionResponse<unknown>> {
    return this.client.post(`/map/user/explore`, { direction: direction });
  }

  pickpocket(): AxiosPromise<SwiftRPGActionResponse<unknown>> {
    return this.client.post("/thieving/pickpocket");
  }

  lookAround(): AxiosPromise<SwiftRPGActionResponse<unknown>> {
    return this.client.get(`/map/user/look`);
  }

  lookDirection(
    direction: string
  ): AxiosPromise<SwiftRPGActionResponse<unknown>> {
    return this.client.get(`/map/user/look/${direction}`);
  }

  lookBuildings(): AxiosPromise<SwiftRPGActionResponse<unknown>> {
    return this.client.get(`/map/user/look/buildings`);
  }

  lookPeople(): AxiosPromise<SwiftRPGActionResponse<unknown>> {
    return this.client.get(`/map/user/look/npcs`);
  }

  questStart(
    quest: number,
    step: number
  ): AxiosPromise<SwiftRPGActionResponse<unknown>> {
    const url = step
      ? `/quests/start/${quest}/${step}`
      : `/quests/start/${quest}`;
    return this.client.get(url);
  }

  questInspect(quest: number): AxiosPromise<SwiftRPGActionResponse<unknown>> {
    return this.client.get(`/quests/inspect/${quest}`);
  }

  questList(): AxiosPromise<SwiftRPGActionResponse<unknown>> {
    return this.client.get(`/quests`);
  }

  stats(character?: number): AxiosPromise<SwiftRPGActionResponse<unknown>> {
    const url = character ? `/stats/${character}` : `/stats`;
    return this.client.get(url);
  }

  async login(discordUser: string, tempToken: string): Promise<User> {
    const prisma = new PrismaClient();
    let user = await prisma.user.findFirst({
      where: {
        discordId: discordUser,
      },
    });
    if (!user) {
      user = await prisma.user.create({
        data: {
          discordId: discordUser,
        },
      });
    }
    const userToken = await this.client.get(`auth/token/login`, {
      headers: {
        "X-Bot-Token": process.env.X_BOT_TOKEN,
        Authorization: `Bearer ${tempToken}`,
      },
    });
    const updatedUser = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        swiftToken: userToken.data.token,
      },
    });
    return updatedUser;
  }
}

export type SwiftRPGActionResponse<T> = {
  skill: string;
  experience: number;
  reward: {
    loot: [{ name: string; quantity: number; total: number }];
    experience: number;
  };
  ticks: number;
  metadata: T;
  seconds_until_tick: number;
  error?: string;
};

export type SwiftRPGActionResponseMetaExplore = {
  direction: "north" | "south" | "east" | "west";
  x: number;
  y: number;
  terrain: {
    name: string;
    description: string;
    movement_cost: number;
  };
  discovered_by: SwiftRPGUser;
  discovered_at: string;
  error?: string;
};

export type SwiftRPGUser = {
  name: string;
  id: number;
  gold: number;
};

export type SwiftRPGActionResponseMetaLookAround = {
  discovered_by: SwiftRPGUser;
  discovered_at: string;
  terrain: {
    name: string;
    description: string;
  };
  x: number;
  y: number;
  last_disturbed: string;
  max_trees: number;
  available_trees: number;
};

export type SwiftRPGActionResponseMetaLookPeople = {
  response: [
    {
      id: number;
      first_name: string;
      last_name: string;
      species: string;
      gender: string;
      thieving: number;
      fishing: number;
      mining: number;
      woodcutting: number;
      firemaking: number;
      cooking: number;
      smithing: number;
      fletching: number;
      crafting: number;
      herblore: number;
      agility: number;
      farming: number;
      hunter: number;
      occupation: SwiftRPGResponseOccupation;
    }
  ];
};

export type SwiftRPGResponseOccupation = {
  id: number;
  name: string;
  description: string;
};
