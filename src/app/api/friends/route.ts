import { NextRequest, NextResponse } from 'next/server';
import { getFriends, updateFriend, deleteFriend } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const friends = getFriends();
  return NextResponse.json({ friends });
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const friends = updateFriend(body);
    return NextResponse.json({ friends });
  } catch {
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
  try {
    const friends = deleteFriend(id);
    return NextResponse.json({ friends });
  } catch {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
