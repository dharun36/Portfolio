import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username } = body;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // LeetCode GraphQL API endpoint
    const graphqlQuery = {
      query: `
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            submitStats: submitStatsGlobal {
              acSubmissionNum {
                difficulty
                count
                submissions
              }
            }
            profile {
              ranking
              reputation
              starRating
            }
            submissionCalendar
          }
        }
      `,
      variables: { username }
    };

    const response = await axios.post(
      'https://leetcode.com/graphql',
      graphqlQuery,
      {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'Mozilla/5.0'
        }
      }
    );

    const userData = response.data.data.matchedUser;

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Extract submission stats
    const stats = userData.submitStats.acSubmissionNum.reduce((acc: any, item: any) => {
      acc[item.difficulty.toLowerCase() + 'Solved'] = item.count;
      if (acc.totalSolved === undefined) acc.totalSolved = 0;
      acc.totalSolved += item.count;
      return acc;
    }, {});

    // Process submission calendar
    let submissionCalendar = {};
    try {
      submissionCalendar = userData.submissionCalendar ? JSON.parse(userData.submissionCalendar) : {};
    } catch (e) {
      console.error('Error parsing submission calendar:', e);
      submissionCalendar = {};
    }

    // Get ranking
    const ranking = userData.profile?.ranking || null;

    return NextResponse.json({
      username: userData.username,
      ...stats,
      ranking,
      submissionCalendar
    });

  } catch (error) {
    console.error('Error fetching LeetCode data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch LeetCode profile' },
      { status: 500 }
    );
  }
}