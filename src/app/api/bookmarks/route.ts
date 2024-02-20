import { connectMongoDB } from '@/lib/mongodb';
import UserModel from '@/models/user';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { email: string } }) {
  try {
    const email = request.nextUrl.searchParams.get('email');

    await connectMongoDB();

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ bookmarks: user.bookmarks }, { status: 200 });
  } catch (error) {
    console.error('Error getting user bookmarks:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, response: NextResponse) {
  const { email, stationId } = await request.json();

  try {
    await connectMongoDB();
    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const bookmark = user?.bookmarks?.some((bookmark) => +bookmark.stationId === stationId);

    if (bookmark) {
      return NextResponse.json({ message: 'Station already in bookmarks' }, { status: 403 });
    }

    user?.bookmarks?.push({ stationId });

    await user.save();

    console.log('Bookmark added successfully');
    return NextResponse.json({ message: 'Bookmark added successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error adding bookmark:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
