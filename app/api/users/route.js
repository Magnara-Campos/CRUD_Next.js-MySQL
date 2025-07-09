// app/api/users/route.js
import { db } from '@/lib/db';

export async function GET() {
  try {
    const [rows] = await db.query('SELECT * FROM users'); // substitui "users" pelo nome real da tua tabela
    return Response.json(rows);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  const { name, email, mobile } = await req.json();
  await db.query('INSERT INTO users (name, email, mobile) VALUES (?, ?, ?)', [
    name, email, mobile
  ]);
  return Response.json({ message: 'Usuário criado' });
}
