import fs from 'fs/promises';
import path from 'path';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const filePath = path.join(
    process.cwd(),
    'public',
    'assets',
    'michael kachiwala SOFTWARE DEV CV.pdf'
  );

  try {
    const data = await fs.readFile(filePath);
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="michael-kachiwala-cv.pdf"',
      },
    });
  } catch (err) {
    return new Response('Not found', { status: 404 });
  }
};
