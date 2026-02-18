import data from '@/data/networth.json';

export async function GET() {
  return Response.json({ data })
}

