'use client'
import { Card, Title } from '@tremor/react';
import 'chart.js/auto';
import { Doughnut } from 'react-chartjs-2';

export default function CircChart() {
  const data = {
    labels: ["Full-Time", "Part-Time", "Terminated", "Intern", "Contractor", "Unspecified"],
    datasets: [
      {
        data: [88, 7, 2, 2, 1, 0],
        backgroundColor: ['indigo', 'fuchsia', 'teal', 'red', 'blue', 'black'],
      },
    ],
  };

  return (
    <Card className="mt-8">
      <Title>Emploiment Status</Title>
      <div className="flex justify-center items-center h-80">
        <Doughnut data={data} />
      </div>
    </Card>
  );
}

