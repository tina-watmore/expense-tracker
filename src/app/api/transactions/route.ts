
import { NextResponse } from 'next/server';
import data from '@/data/transactions.json';
import fs from 'fs';
import path from 'path';
import type { Transaction, TransactionsData } from '@/types/transactions';

const filePath = path.join(process.cwd(), 'src/data/transactions.json');

export async function GET() {
  return Response.json({ data })
}

export async function POST(req: Request) {
  try {
    const newTransaction: Omit<Transaction, 'id'> = await req.json();
    
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const json: TransactionsData = JSON.parse(fileData);

    const nextId = json.transactions.length > 0 
      ? Math.max(...json.transactions.map(t => t.id)) + 1
      : 1;

    const transaction: Transaction = {
      id: nextId,
      ...newTransaction
    }

    json.transactions.push(transaction);

    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));

    return NextResponse.json({ success: true, transaction})
  } catch (err) {
    return NextResponse.json(
      {success: false, error: 'Failed to save transaction'},
      {status: 500}
    )
  }
}
