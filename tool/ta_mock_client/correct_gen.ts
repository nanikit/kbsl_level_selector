main().catch(console.error);

async function main() {
  const sources = [
    "./protos/discord.ts",
    "./protos/models.ts",
    "./protos/packets.ts",
  ];
  await Promise.all(sources.map(rewriteSource));
}

async function rewriteSource(path: string): Promise<void> {
  const source = await Deno.readTextFile(path);
  const processed = processSource(source);
  await Deno.writeTextFile(path, processed);
}

function processSource(source: string): string {
  let transforming = source;
  transforming = transforming.replace(
    'import _m0 from "protobufjs/minimal";',
    'import _m0 from "https://esm.sh/protobufjs@7.1.2";',
  );
  transforming = transforming.replace(
    'import Long from "long";',
    'import Long from "https://esm.sh/long@5.2.0";',
  );
  transforming = transforming.replace(
    ' from "./discord";',
    ' from "./discord.ts";',
  );
  transforming = transforming.replace(
    ' from "./models";',
    ' from "./models.ts";',
  );
  return transforming;
}
