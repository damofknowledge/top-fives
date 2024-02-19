import { createPool } from '@vercel/postgres';

/**
 * @returns artists - An array of artist objects
 */

export default defineEventHandler(async () => {
  const startTime = Date.now();

  const db = createPool();
  try {
    const { rows: artists } = await db.query(`SELECT * FROM artists ORDER BY id DESC LIMIT 366`);
    const duration = Date.now() - startTime;
    return {
      artists: artists,
      duration: duration,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    // @ts-ignore
    if (error?.message === `relation "artists" does not exist`) {
      console.log('Table does not exist');
    } else {
      throw error;
    }
    return {
      artists: [],
      duration: duration,
    };
  }
});
