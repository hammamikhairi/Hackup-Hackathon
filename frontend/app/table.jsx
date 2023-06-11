import {
  Table, TableBody,
  TableCell, TableHead, TableHeaderCell, TableRow, Text
} from '@tremor/react';

import Link from 'next/link';
 

        

export default async function UsersTable({ users }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Username</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.user_id}>
            <TableCell>
              <Link href={"/user?userId=" + user.user_id}>
                {user.name}
              </Link>
            </TableCell>
            <TableCell>
              <Text>{user.username}</Text>
            </TableCell>
            <TableCell>
              <Text>{user.email}</Text>
            </TableCell>
            <TableCell>
              <button style={{border : "2px solid #000"}}>Add Task</button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
