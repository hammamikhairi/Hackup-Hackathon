'use client'

import { Card, Flex, Grid, Metric, Title } from '@tremor/react';
import Link from 'next/link';
import { useState } from 'react';
import Chart from './chart';
import CircChart from './CircChart';

export default function UserPage() {

  const [user, setUser] = useState(null)
  const [tasks, setTasks] = useState(null)
  const [score, setScore] = useState(null)


  const params = new URLSearchParams(window.location.search);

  if (user === null)
    fetch("http://localhost:5051/user?userId=" + params.get("userId"))
      .then(res => res.json())
      .then(dat => {console.log(dat) ; setUser(dat)})
  if (tasks === null)
    fetch("http://localhost:5051/usertasks?userId=" + params.get("userId"))
      .then(res => res.json())
      .then(dat => { setTasks(dat)})
  if (score === null)
    fetch("http://localhost:5051/userscore?userId=" + params.get("userId"))
      .then(res => res.json())
      .then(dat => { setScore(dat.score)})


  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Grid className="mt-5 gap-6" numColsLg={3}>
          <Card  style={{ gridColumn:  '1/3' }} >
            <Title>General Info</Title>
            <Flex
              className="space-x-2"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric>Score : {score !== null && score}</Metric>
            </Flex>
            <Flex
              className="space-x-2"
              justifyContent="start"
              alignItems="baseline"
              style={{height : "50%"}}
            >
              <CircChart />
            </Flex>
          </Card>
          <Card  style={{ gridColumn: '3/5' }} >
            {
              user &&
              <img src={user.user_id === '1' ? `images/die.jpg` : `images/eoh.jpg`} alt="die png" className="w-21 h-auto" style={{borderRadius : "50%"}} />
            }
            <Title style={{fontSize : "2rem", paddingTop : "1rem"}}>{user && user.name }</Title>
            <Flex
              className="space-x-2"
              justifyContent="start"
              alignItems="baseline"
            >
              <Metric style={{fontSize : "1.5rem"}}>
                {user && user.phone}
              </Metric>
            </Flex>
            <Flex
              className="space-x-2"
              justifyContent="start"
              alignItems="baseline"
              style={{paddingBottom : "1rem"}}
            >
              <Metric style={{fontSize : "1rem"}}>
                {user && user.email}
              </Metric>
            </Flex>
          </Card>
      </Grid>
      <Grid className="mt-4 gap-6" numColsLg={4}>
          <Card  style={{ gridColumn:  '1/3' }} >
            <Title>Current Task</Title>
            <ul className="list-disc pl-4 mt-4">
              <li className="mb-2">Task 4
              <Link href="/review">
                  <button style={{border : "2px solid #000"}}>Submit</button>
              </Link>
              </li>
            </ul>
          </Card>
          <Card  style={{ gridColumn: '3/5' }} >
            <Title>Accomplished Tasks</Title>
            <ul className="list-disc pl-4 mt-4">
              {
                tasks !== null &&
                tasks.map(task => <li className="mb-2">{task.name}. Score : {`<${task.score}>`}</li>)
              }
            </ul>
          </Card>
      </Grid>
      <Chart name={user && user.name} />
    </main>
  );
}
