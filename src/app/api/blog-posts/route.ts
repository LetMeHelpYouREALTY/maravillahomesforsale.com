/**
 * Local market-insight cards. KCM RSS is stopped — this route no longer
 * fetches Simplifying the Market.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getMarketInsightPosts } from '@/data/market-insight-posts';

export async function GET(request: NextRequest) {
  const limitParam = request.nextUrl.searchParams.get('limit');
  const parsedLimit = limitParam ? Number.parseInt(limitParam, 10) : 3;
  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), 20)
    : 3;

  const blogPosts = getMarketInsightPosts(limit).map((post) => ({
    title: post.title,
    postLink: post.href,
    description: post.description,
    category: post.category,
    categoryLink: post.categoryHref,
    author: post.author,
    date: post.date,
    imageUrl: post.imageUrl,
  }));

  return NextResponse.json({ blogPosts }, { status: 200 });
}
