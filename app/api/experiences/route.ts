// app/api/experiences/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'data.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading JSON:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
