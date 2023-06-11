'use client'

import { Card, Title } from '@tremor/react';
import Link from 'next/link';
import StarRating from '../user/StarRating';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">

          <Card  >
      <Title>Task Review</Title>
            <ul className="list-disc pl-4 mt-4">
              <li className="mb-2">Deadline Respect <StarRating totalStars={0} /></li>
              <li className="mb-2">Perfection <StarRating totalStars={0} /></li>
              <li className="mb-2">Decipline <StarRating totalStars={0} /></li>
            </ul>
            <div>
              <label htmlFor="note">Leave a note</label>
            </div>
            <textarea style={{border : "2px solid #000", width: "100%"}} name="note" id="note" rows="10"></textarea>
            <Link href="/user">
                <button style={{border : "2px solid #000"}}>Submit</button>
            </Link>
        </Card>
    </main>
  );
}
