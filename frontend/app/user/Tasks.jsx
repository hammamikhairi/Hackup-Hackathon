'use client';

import { Title } from '@tremor/react';


export default function Tasks({title}) {
  return (
    <>
      <Title>{title}</Title>
      <ul className="list-disc pl-4 mt-4">
        <li className="mb-2">Task 1</li>
        <li className="mb-2">Task 2</li>
        <li className="mb-2">Task 3</li>
      </ul>
    </>
  );
}
