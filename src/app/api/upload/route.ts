
import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate a unique filename
    const extension = path.extname(file.name);
    const uniqueFilename = `${uuidv4()}${extension}`;
    
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const relativePath = path.join('/uploads', uniqueFilename); // Path for URL
    const absolutePath = path.join(uploadDir, uniqueFilename); // Path for saving

    // Ensure upload directory exists
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (mkdirError: any) {
      // Ignore EEXIST error (directory already exists), but throw others
      if (mkdirError.code !== 'EEXIST') {
        console.error('Failed to create upload directory:', mkdirError);
        return NextResponse.json({ success: false, error: 'Failed to create upload directory.' }, { status: 500 });
      }
    }
    
    await writeFile(absolutePath, buffer);
    console.log(`File uploaded successfully to ${absolutePath}`);

    return NextResponse.json({ success: true, filePath: relativePath });
  } catch (error) {
    console.error('Upload failed:', error);
    return NextResponse.json({ success: false, error: 'Upload failed.' }, { status: 500 });
  }
}
