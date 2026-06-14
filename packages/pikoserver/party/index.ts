import { routePartykitRequest, Server } from "partyserver";
import type { Connection, WSMessage } from "partyserver";

import type {
  BroadcastMessage,
  BroadcastData,
  PlayerConfig,
} from "@pikopiko/piko-types";

// Define your Server
export class PikoServer extends Server {
  hostId: string | null = null;
  connections: Connection[] = [];
  activeConnections: Connection[] = [];
  configs: PlayerConfig[] = [];
  onStart(props?: Record<string, unknown> | undefined): void | Promise<void> {
    console.log("Server started");
  }
  onConnect(connection: Connection) {
    console.log("Connected", connection.id, "to server", this.name);
    if (!this.connections.map((c) => c.id).includes(connection.id)) {
      this.connections.push(connection);
    }
    if (!this.activeConnections.map((c) => c.id).includes(connection.id)) {
      this.activeConnections.push(connection);
    }
    if (this.hostId == null) {
      this.hostId = connection.id;
      console.log("Host is " + connection.id);
    }
    if (!this.configs.find((c) => c.playerId == connection.id)) {
      this.configs.push({
        playerId: connection.id,
        name: "",
        avatarHash: connection.id,
      });
    }
    let message: BroadcastMessage<"PLAYER_LIST"> = {
      broadcast_code: "PLAYER_LIST",
      data: {
        player_ids: this.connections.map((c) => c.id),
        active_ids: this.activeConnections.map((c) => c.id),
      },
    };
    this.cast(message);
    let hostMessage: BroadcastMessage<"HOST_IDENTIFIER"> = {
      broadcast_code: "HOST_IDENTIFIER",
      data: {
        hostId: this.hostId,
      },
    };
    this.message(connection, hostMessage);

    let configMessage: BroadcastMessage<"PLAYER_CONFIG_LIST"> = {
      broadcast_code: "PLAYER_CONFIG_LIST",
      data: {
        playerConfigs: this.configs,
      },
    };
    this.cast(configMessage);
  }
  onClose(
    connection: Connection,
    code: number,
    reason: string,
    wasClean: boolean,
  ): void | Promise<void> {
    let conIdx = this.activeConnections.findIndex(
      (c: Connection) => c.id == connection.id,
    );
    this.activeConnections.splice(conIdx, 1);
    let message: BroadcastMessage<"PLAYER_LIST"> = {
      broadcast_code: "PLAYER_LIST",
      data: {
        player_ids: this.connections.map((c) => c.id),
        active_ids: this.activeConnections.map((c) => c.id),
      },
    };
    this.cast(message);
  }

  cast(msg: BroadcastMessage, without?: string[] | undefined) {
    this.broadcast(JSON.stringify(msg), without);
  }
  message(connection: Connection, msg: BroadcastMessage) {
    connection.send(JSON.stringify(msg));
  }

  onMessage(connection: Connection, message: WSMessage) {
    let _d: BroadcastMessage = JSON.parse(message as string);

    switch (_d.broadcast_code) {
      case "PLAYER_CONFIG_SET":
        const data = _d.data as BroadcastData<"PLAYER_CONFIG_SET">;
        let configIdx = this.configs.findIndex(
          (c) => c.playerId == data.playerId,
        );
        if (configIdx == -1) {
          this.configs.push(data);
        } else {
          this.configs[configIdx] = data;
        }
        let message: BroadcastMessage<"PLAYER_CONFIG_LIST"> = {
          broadcast_code: "PLAYER_CONFIG_LIST",
          data: {
            playerConfigs: this.configs,
          },
        };
        this.cast(message);
        break;
      default: {
        break;
      }
    }
  }
}

export default {
  async fetch(request: Request, env: any): Promise<Response> {
    return (
      (await routePartykitRequest(request, env)) ||
      new Response("Not Found", { status: 404 })
    );
  },
};
