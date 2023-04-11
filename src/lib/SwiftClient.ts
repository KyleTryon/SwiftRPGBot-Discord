import axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig } from "axios";

export class SwiftClient {
  config: AxiosRequestConfig;
  client: AxiosInstance;
  constructor(auth: string) {
    this.config = {
      baseURL: process.env.SWIFT_URL,
      headers: {
        "X-Bot-Token": process.env.X_BOT_TOKEN,
        Authorization: `Bearer ${auth}`,
      },
    };
    this.client = axios.create(this.config);
  }

  chop(): AxiosPromise<SwiftRPGActionResponse | SwiftRPGActionErrorResponse> {
    return this.client.post("/woodcutting/chop");
  }

  explore(
    direction: string
  ): AxiosPromise<SwiftRPGActionResponse | SwiftRPGActionErrorResponse> {
    return this.client.post(`/map/user/explore`, { direction: direction });
  }

  pickpocket(): AxiosPromise<
    SwiftRPGActionResponse | SwiftRPGActionErrorResponse
  > {
    return this.client.post("/thieving/pickpocket");
  }

  lookAround(): AxiosPromise<
    SwiftRPGActionResponse | SwiftRPGActionErrorResponse
  > {
    return this.client.get(`/map/user/look`);
  }

  lookBuildings(): AxiosPromise<
    SwiftRPGActionResponse | SwiftRPGActionErrorResponse
  > {
    return this.client.get(`/map/user/look/buildings`);
  }

  lookPeople(): AxiosPromise<
    SwiftRPGActionResponse | SwiftRPGActionErrorResponse
  > {
    return this.client.get(`/map/user/look/npcs`);
  }

  questStart(
    quest: number,
    step: number
  ): AxiosPromise<SwiftRPGActionResponse | SwiftRPGActionErrorResponse> {
    const url = step
      ? `/quests/start/${quest}/${step}`
      : `/quests/start/${quest}`;
    return this.client.get(url);
  }

  questInspect(
    quest: number
  ): AxiosPromise<SwiftRPGActionResponse | SwiftRPGActionErrorResponse> {
    return this.client.get(`/quests/inspect/${quest}`);
  }

  questList(): AxiosPromise<
    SwiftRPGActionResponse | SwiftRPGActionErrorResponse
  > {
    return this.client.get(`/quests`);
  }

  stats(
    character?: number
  ): AxiosPromise<SwiftRPGActionResponse | SwiftRPGActionErrorResponse> {
    const url = character ? `/stats/${character}` : `/stats`;
    return this.client.get(url);
  }
}

export type SwiftRPGActionResponse = {
  skill: string;
  experience: number;
  reward_xp: number;
  reward: {
    type: string;
    quantity: number;
    total: number;
  };
  ticks: number;
  metadata?: unknown;
  seconds_until_tick: number;
};

export type SwiftRPGActionErrorResponse = {
  error: string;
};
