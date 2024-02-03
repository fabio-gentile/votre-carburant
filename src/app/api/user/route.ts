import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';

export async function POST(request: NextResponse) {
  const { name, email, bookmarks } = await request.json();
  // console.log(name, email, bookmarks);
  await connectMongoDB();
  await User.create({ name, email, bookmarks });

  return NextResponse.json({ message: 'User Registered' }, { status: 201 });
}
