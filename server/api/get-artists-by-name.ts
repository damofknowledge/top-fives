import { createPool } from '@vercel/postgres';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const db = createPool();
  try {
    const { rows: artists } = await db.query(
      `SELECT * FROM artists WHERE id <= ${query.id} AND LOWER(name) LIKE '%${query.name}%' ORDER BY name, CASE WHEN LOWER(name) = '${query.name}' THEN name END, CASE WHEN LOWER(name) LIKE '${query.name}%' THEN name END;`
    );
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
