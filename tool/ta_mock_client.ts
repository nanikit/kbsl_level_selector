import { User, User_ClientTypes } from "./protos/models.ts";
import { Packet } from "./protos/packets.ts";
import { delay } from "https://deno.land/std@0.159.0/async/delay.ts";
import { parse } from "https://deno.land/std@0.159.0/flags/mod.ts";

const messages = {
  nanikit: [] as Packet[],
  suisensei: [] as Packet[],
  sier: [] as Packet[],
};

main().catch(console.error);

async function main() {
  const { server } = parse(Deno.args, {
    alias: { s: "server" },
    default: { server: "ws://localhost:2053" },
  });
  const { socket: p1 } = await createConnection({
    name: "nanikit",
    userId: "76561198159100356",
    clientType: User_ClientTypes.Player,
    modList: [
      "yt-dlp",
      "BSIPA",
      "BeatSaberMarkupLanguage",
      "SiraUtil",
      "Ini Parser",
      "NoItalics",
      "Arcgap",
      "SoundReplacer",
      "TournamentAssistant",
    ],
  }, { server });
  const { socket: p2 } = await createConnection({
    name: "suisensei",
    userId: "76561198357821968",
    clientType: User_ClientTypes.Player,
    modList: [
      "yt-dlp",
      "BSIPA",
      "BeatSaberMarkupLanguage",
      "SiraUtil",
      "Ini Parser",
      "NoItalics",
      "Arcgap",
      "SoundReplacer",
      "TournamentAssistant",
    ],
  }, { server });
  const { socket: coordinator, added } = await createConnection({
    name: "sier",
    userId: "0",
    clientType: User_ClientTypes.Coordinator,
  }, { server });

  while (true) {
    const users = messages.sier.map((x) => x.response?.connect?.state?.users)
      .find((x) => x);
    if (!users) {
      await delay(300);
      continue;
    }
    coordinator.send(
      Packet.encode({
        event: {
          matchCreatedEvent: {
            match: {
              guid: crypto.randomUUID(),
              leader: added.event?.userAddedEvent?.user?.guid,
              associatedUsers: users?.map((x) => x.guid!),
              startTime: new Date().toISOString(),
              selectedLevel: { levelId: "custom_level_???" },
              selectedCharacteristic: { serializedName: "Standard", difficulties: [4] },
              selectedDifficulty: 4,
            },
          },
        },
      }).finish(),
    );
    break;
  }

  let audience = [] as string[];
  (async () => {
    while (true) {
      const pkt = await receive(p1);
      const { event } = pkt;
      const { match } = event?.matchCreatedEvent ?? event?.matchUpdatedEvent ?? {};
      if (match) {
        audience = match.associatedUsers as string[];
      }
    }
  })();

  const p1Guid = messages.nanikit.map((x) => x.response?.connect?.selfGuid).find((x) => x);
  const p2Guid = messages.suisensei.map((x) => x.response?.connect?.selfGuid).find((x) => x);
  while (true) {
    await delay(300);
    const s = {
      from: p1Guid,
      forwardingPacket: {
        forwardTo: audience,
        packet: {
          push: {
            realtimeScore: {
              userGuid: p1Guid,
              accuracy: Math.random(),
              scoreTracker: { notesMissed: 0 },
            },
          },
        },
      },
    } as Packet;
    p1.send(Packet.encode(s).finish());
    p2.send(
      Packet.encode({
        from: p2Guid,
        forwardingPacket: {
          forwardTo: audience,
          packet: {
            push: {
              realtimeScore: {
                userGuid: p2Guid,
                accuracy: Math.random(),
                scoreTracker: { notesMissed: 0 },
              },
            },
          },
        },
      }).finish(),
    );
  }
}

async function createConnection(user: User, { server }: { server: string }) {
  const socket = new WebSocket(server);
  socket.addEventListener("message", async (message: MessageEvent<Blob>) => {
    const buffer = await message.data.arrayBuffer();
    messages[user.name as keyof typeof messages].push(
      Packet.decode(new Uint8Array(buffer)),
    );
  });
  socket.addEventListener("error", (err) => {
    console.error(`${user.name} error: ${err}`);
  });
  socket.addEventListener("close", (err) => {
    console.error(`${user.name} close: ${err}`);
  });
  await new Promise((resolve, reject) => {
    socket.addEventListener("error", reject, { once: true });
    socket.addEventListener("open", resolve, { once: true });
  });
  sendHello(socket, { user });
  const added = await receive(socket);
  return { socket, added };
}

async function receive(socket: WebSocket) {
  const message = await new Promise<MessageEvent<Blob>>((resolve, reject) => {
    socket.addEventListener("error", reject, { once: true });
    socket.addEventListener("message", resolve, { once: true });
  });
  const buffer = await message.data.arrayBuffer();
  return Packet.decode(new Uint8Array(buffer));
}

function sendHello(socket: WebSocket, { user }: { user: User }) {
  socket.send(
    Packet.encode({
      request: { connect: { user, clientVersion: 67 } },
    }).finish(),
  );
}
