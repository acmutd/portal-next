import { Event, EventUpdateInput } from 'lib/generated/graphql';

type GuildEvent = {
  channel_id: null;
  entity_metadata: {
    location: string;
  };
  name: string;
  privacy_level: 2;
  scheduled_start_time: string;
  scheduled_end_time: string;
  description?: string;
  entity_type: 3;
  guild_id: string;
  image: null;
};
const BASE_URL = 'https://discord.com/api';

export async function sendEventToDiscordGuildEvent(event: Event) {
  const guildEvent: GuildEvent = {
    channel_id: null,
    entity_metadata: {
      location: event.location,
    },
    entity_type: 3,
    guild_id: process.env.DISCORD_GUILD_ID!,
    image: null,
    name: event.summary,
    privacy_level: 2,
    scheduled_end_time: event.end.toISOString(),
    scheduled_start_time: event.start.toISOString(),
  };

  const endpoint = `${BASE_URL}/guilds/${guildEvent.guild_id}/scheduled-events`;

  await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
    },
    body: JSON.stringify(guildEvent),
  });
}
