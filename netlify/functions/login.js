import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.NETLIFY_DATABASE_URL
});

export async function handler(event) {
  const { username, password } = JSON.parse(event.body);

  const result = await pool.query(
    "SELECT * FROM users WHERE username=$1 AND password=$2",
    [username, password]
  );

  if (result.rows.length > 0) {
    return {
      statusCode: 200,
      headers:  { 
        "content-type": "application/json"  
      },
      body: JSON.stringify({ success: true })
    };
  }

  return {
    statusCode: 401,
    headers: { 
      "content-Type":"application/json"
    },
    body: JSON.stringify({ success: false })
  };
}
