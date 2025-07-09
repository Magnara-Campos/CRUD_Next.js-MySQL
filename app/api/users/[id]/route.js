// app/api/users/[id]/route.js
import { db } from '@/lib/db';

export async function GET(req, { params }) {
  const { id } = params;
  const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
  return Response.json(rows[0]);
}

export async function PUT(req, { params }) {
  const { id } = params;
  const { name, email, mobile } = await req.json();
  await db.query('UPDATE users SET name = ?, email = ?, mobile = ? WHERE id = ?', [
    name, email, mobile, id
  ]);
  return Response.json({ message: 'User updated' });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  await db.query('DELETE FROM users WHERE id = ?', [id]);
  return Response.json({ message: 'User deleted' });
}
