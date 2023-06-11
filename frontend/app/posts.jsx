import {
  Table, TableBody,
  TableCell, TableHead, TableHeaderCell, TableRow
} from '@tremor/react';


export default async function PostsTable({ posts }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Posts</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell>
              <h1>
                {post.title}
              </h1>
              <div>{post.body}</div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
