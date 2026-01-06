export default async function handler(req, res) {
  const SUPABASE_URL = "https://zxhxjvurrdfioskgbjvw.supabase.co";
  const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const url = `${SUPABASE_URL}/rest/v1/applications?select=*`;

  try {
    const response = await fetch(url, {
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      },
    });

    const data = await response.json();

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

