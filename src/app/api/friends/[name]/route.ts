import { NextRequest, NextResponse } from 'next/server';
import { getFriendByName } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ name: string }> }
) {
  const { name } = await context.params;
  const friend = getFriendByName(name);
  if (!friend) {
    return NextResponse.json({ friend: null }, { status: 404 });
  }
  return NextResponse.json({ friend });
}
