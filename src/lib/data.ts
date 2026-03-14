import { Friend } from '@/types';
import fs from 'fs';
import path from 'path';

// Railway: use /data if volume mounted, otherwise fallback to local data dir
const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'friends.json');
const SEED_FILE = path.join(process.cwd(), 'src', 'data', 'friends.json');

function ensureDataFile(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    // Copy seed data on first run
    if (fs.existsSync(SEED_FILE)) {
      fs.copyFileSync(SEED_FILE, DATA_FILE);
    } else {
      fs.writeFileSync(DATA_FILE, '[]', 'utf-8');
    }
  }
}

export function getFriends(): Friend[] {
  try {
    ensureDataFile();
    const raw = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function getFriendByName(name: string): Friend | undefined {
  const friends = getFriends();
  return friends.find((f) => f.name === decodeURIComponent(name));
}

export function getFriendById(id: string): Friend | undefined {
  const friends = getFriends();
  return friends.find((f) => f.id === id);
}

export function saveFriends(friends: Friend[]): void {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(friends, null, 2), 'utf-8');
}

export function updateFriend(updated: Friend): Friend[] {
  const friends = getFriends();
  const idx = friends.findIndex((f) => f.id === updated.id);
  if (idx >= 0) {
    friends[idx] = { ...updated, updatedAt: new Date().toISOString().split('T')[0] };
  } else {
    updated.id = String(Date.now());
    updated.updatedAt = new Date().toISOString().split('T')[0];
    friends.push(updated);
  }
  saveFriends(friends);
  return friends;
}

export function deleteFriend(id: string): Friend[] {
  let friends = getFriends();
  friends = friends.filter((f) => f.id !== id);
  saveFriends(friends);
  return friends;
}
