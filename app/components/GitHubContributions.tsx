"use client";

import React from 'react';
import GitHubCalendar from 'react-github-calendar';

export default function GitHubContributions() {
  return (
    <div className="github-contributions w-full">
      <div className="p-4 sm:p-6 bg-gray-900 rounded-xl">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-100">GitHub Contributions</h2>
        <div className="overflow-x-auto">
          <GitHubCalendar
            username="dharun36"
            blockSize={12}
            blockMargin={4}
            fontSize={14}
            colorScheme="dark"
            hideColorLegend={false}
            hideMonthLabels={false}
            labels={{
              totalCount: '{{count}} contributions in the last year',
            }}
            theme={{
              dark: ['#161b22', '#39d353'],
            }}
          />
        </div>
      </div>
    </div>
  );
}