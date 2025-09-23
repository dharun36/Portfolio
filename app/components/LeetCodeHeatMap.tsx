'use client';

import React from 'react';

interface HeatMapProps {
  data: Array<{ date: string; count: number }>;
  colorScheme?: 'light' | 'dark';
}

interface DayData {
  date: string;
  count: number;
}

const LeetCodeHeatMap: React.FC<HeatMapProps> = ({
  data = [],
  colorScheme = 'dark'
}) => {
  // Get last 12 months (364 days)
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364);

  // Generate dates array for the last 12 months
  const dates: string[] = [];
  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }

  // Group data by date
  const dateMap: Record<string, number> = {};
  data.forEach(item => {
    if (dateMap[item.date]) {
      dateMap[item.date] += item.count;
    } else {
      dateMap[item.date] = item.count;
    }
  });

  // Determine color intensity based on count
  const getColorClass = (count: number) => {
    if (count === 0) return "bg-gray-100 dark:bg-gray-800/30";
    if (count === 1) return "bg-[#f7cf7c]/40";
    if (count === 2) return "bg-[#f7cf7c]/60";
    if (count === 3) return "bg-[#f7cf7c]/80";
    if (count === 4) return "bg-[#f7cf7c]";
    if (count <= 6) return "bg-[#f89f1b]/80";
    if (count <= 9) return "bg-[#f89f1b]/90";
    return "bg-[#f89f1b]";
  };

  // Get day of week (0-6, Sunday-Saturday)
  const getDayOfWeek = (dateString: string) => {
    const date = new Date(dateString);
    return date.getDay();
  };

  // Group dates by day of week
  const dayGroups: DayData[][] = Array(7).fill(0).map(() => [] as DayData[]);

  dates.forEach((dateString) => {
    const dayOfWeek = getDayOfWeek(dateString);
    const count = dateMap[dateString] || 0;
    dayGroups[dayOfWeek].push({ date: dateString, count });
  });

  // Format date for display
  const formatDateForDisplay = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get month labels for display
  const getMonthLabels = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const labels = [];

    // Get months from dates (starting from oldest)
    let currentMonth = new Date(dates[0]).getMonth();
    let currentMonthString = months[currentMonth];
    let currentMonthPosition = 0;

    for (let i = 0; i < dates.length; i += 7) {
      const date = new Date(dates[i]);
      const month = date.getMonth();

      if (month !== currentMonth) {
        // Add previous month label
        labels.push({
          month: currentMonthString,
          position: (currentMonthPosition / dates.length) * 100
        });

        currentMonth = month;
        currentMonthString = months[month];
        currentMonthPosition = i;
      }
    }

    // Add last month
    labels.push({
      month: currentMonthString,
      position: (currentMonthPosition / dates.length) * 100
    });

    return labels;
  };

  return (
    <div className="leetcode-heatmap-container">
      {/* Month labels */}
      <div className="relative h-5 w-full mb-1">
        {getMonthLabels().map((label, i) => (
          <div
            key={`${label.month}-${i}`}
            className="absolute text-xs text-gray-500 dark:text-gray-400"
            style={{ left: `${label.position}%` }}
          >
            {label.month}
          </div>
        ))}
      </div>

      {/* Days of week labels */}
      <div className="flex">
        <div className="flex flex-col mr-2 text-xs text-gray-500 dark:text-gray-400 mt-1">
          <div className="h-3 mb-[9px]">Sun</div>
          <div className="h-3 mb-[9px]">Mon</div>
          <div className="h-3 mb-[9px]">Tue</div>
          <div className="h-3 mb-[9px]">Wed</div>
          <div className="h-3 mb-[9px]">Thu</div>
          <div className="h-3 mb-[9px]">Fri</div>
          <div className="h-3">Sat</div>
        </div>

        {/* Calendar grid */}
        <div className="flex gap-1">
          {dayGroups.map((days, dayOfWeek) => (
            <div key={dayOfWeek} className="flex flex-col gap-1">
              {days.map(day => (
                <div
                  key={day.date}
                  className={`w-3 h-3 rounded-sm ${getColorClass(day.count)}`}
                  title={`${formatDateForDisplay(day.date)}: ${day.count} ${day.count === 1 ? 'submission' : 'submissions'}`}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-between mt-2 items-center">
        <span className="text-xs text-gray-500 dark:text-gray-400">Less</span>
        <div className="flex gap-1">
          {[0, 1, 2, 4, 6, 10].map(count => (
            <div
              key={count}
              className={`w-3 h-3 rounded-sm ${getColorClass(count)}`}
              title={`${count} submissions`}
            ></div>
          ))}
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">More</span>
      </div>

      <style jsx>{`
        .leetcode-heatmap-container {
          padding: 12px;
          background: rgba(30, 30, 30, 0.3);
          border-radius: 8px;
          max-width: 100%;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
};

export default LeetCodeHeatMap;