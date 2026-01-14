
import data from '@/data/expenses.json';

export async function GET() {
  return Response.json({ data })
}