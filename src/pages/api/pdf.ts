import fs from 'fs/promises';
import path from 'path';
import type { APIRoute } from 'astro';

const PUBLIC_ASSET_PATH = '/assets/pdf.pdf';

export const GET: APIRoute = async () => {
  const filePath = path.join(
    process.cwd(),
    'public',
    'assets',
    'pdf.pdf'
  );

  try {
    // Attempt to read and serve the file directly (works in local dev and adapters that include public files on disk)
    const data = await fs.readFile(filePath);
    return new Response(data, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'inline; filename="pdf.pdf"',
      },
    });
  } catch (err) {
    // In Vercel production static files are served from the `public` folder at their URL.
    // Reading from disk may fail in serverless environments, so fallback to redirecting
    // the client to the public asset URL which Vercel will serve. Use an encoded URL
    // to avoid issues with spaces in the filename.
    const redirectUrl = encodeURI(PUBLIC_ASSET_PATH);
    return Response.redirect(redirectUrl, 302);
  }
};
