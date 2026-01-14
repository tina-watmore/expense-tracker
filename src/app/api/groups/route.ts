import data from '@/data/groups.json';

export async function GET() {
  return Response.json({ data })
}