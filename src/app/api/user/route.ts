import { connectMongoDB } from '@/lib/mongodb';
import UserModel from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest, response: NextResponse) {
  const { name, email, bookmarks } = await request.json();
  await connectMongoDB();
  await UserModel.create({ name, email, bookmarks });

  return NextResponse.json({ message: 'User Registered' }, { status: 201 });
}
