'use client'


import { Card, Title } from '@tremor/react';
import { useState } from 'react';
import PostsTable from './posts';
import Search from './search';
import UsersTable from './table';


export const dynamic = 'force-dynamic';

export default async function IndexPage() {



  const [data, setData] = useState(null)
  const [posts, setPosts] = useState(null)


  if (data === null && data !== undefined)
    fetch("http://localhost:5051/users")
      .then(res => res.json())
      .then(dat => setData(dat))

  if (posts === null && posts !== undefined)
    fetch("http://localhost:5051/posts")
      .then(res => res.json())
      .then(dat => setPosts(dat))


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Employees</Title>
      <Search />
      <Card className="mt-6">
        {
          data !== null &&
          <UsersTable users={data} />
        }
      </Card>
      <Card className="mt-6">
        {
          posts !== null && posts !== undefined &&
          <PostsTable posts={posts} />
        }
      </Card>
    </main>
  );
}
