import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), 'app', 'data', 'data.json');
    console.log('Resolved path:', filePath);
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    res.status(200).json(data)
  } catch (error) {
    console.error('Error reading JSON:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
