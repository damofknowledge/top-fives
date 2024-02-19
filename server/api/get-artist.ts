import { createPool } from '@vercel/postgres';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const db = createPool();
  try {
    const { rows: artists } = await db.query(`SELECT * FROM artists where id=${query.id} LIMIT 1`);
    return {
      artists: artists,
    };
  } catch (error) {
    // @ts-ignore
    if (error?.message === `relation "artists" does not exist`) {
      console.log('Table does not exist');
    } else {
      throw error;
    }
    return {
      artists: [],
    };
  }
});
