import { sql } from '@vercel/postgres';

async function seedArtist(id: number, artistId: string, name: string) {
  await sql`
          INSERT INTO artists (id, "artistId", name)
          VALUES (${id}, ${artistId}, ${name})
          ON CONFLICT (name) DO NOTHING;
  `;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    await seedArtist(body.id, body.artistId, body.name);
  } catch (error) {
    // @ts-ignore
    if (error?.message === `relation "artists" does not exist`) {
      console.log('Table does not exist');
    } else {
      throw error;
    }
  }
});
