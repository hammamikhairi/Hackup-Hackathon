'use client';

import { AreaChart, Card, Title } from '@tremor/react';

const data = [
  {
    Month: 'Jan 21',
    Productivity: 2890,
  },
  {
    Month: 'Feb 21',
    Productivity: 1890,
  },
  {
    Month: 'Jan 22',
    Productivity: 3890,
  }
];

export default function Chart({name}) {
  return (
    <Card className="mt-8" >
      <Title>{name}'s Performance</Title>
      <AreaChart
        className="mt-4 h-80"
        data={data}
        categories={['Productivity']}
        index="Month"
        colors={['indigo']}
        showYAxis={false}
      />
    </Card>
  );
}
