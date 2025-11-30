import http from 'k6/http';
import { check, sleep } from 'k6';


export const options = {
  stages: [
    // PHASE 1: Warm-up Load Test
    { duration: '20s', target: 30 },   // ramp to 30 users
    { duration: '20s', target: 30 },   // steady load

    // PHASE 2: Spike Test
    { duration: '2s', target: 150 },   // jump to 150 users instantly
    { duration: '10s', target: 150 },  // hold spike load

    // PHASE 3: Stress Test
    { duration: '10s', target: 300 },  // ramp higher
    { duration: '10s', target: 500 },  // max stress
    { duration: '10s', target: 500 },  // hold stress

    // PHASE 4: Recovery
    { duration: '15s', target: 0 },    // ramp down to 0
  ],

  thresholds: {
    http_req_duration: [
      'p(95)<1000',   // 95% of requests should be < 1s
      'p(99)<2000',   // 99% < 2s
    ],
    http_req_failed: ['rate<0.05'], // less than 5% errors allowed
  },
};

export default function () {
  // 1. Fetch list of posts
  let posts = http.get('https://jsonplaceholder.typicode.com/posts');
  check(posts, { 'GET /posts is 200': (r) => r.status === 200 });

  // 2. Fetch details of a single post
  let post = http.get('https://jsonplaceholder.typicode.com/posts/1');
  check(post, { 'GET /posts/1 is 200': (r) => r.status === 200 });

  // 3. Fetch comments for that post
  let comments = http.get('https://jsonplaceholder.typicode.com/comments?postId=1');
  check(comments, { 'GET /comments is 200': (r) => r.status === 200 });

  // 4. Fetch users
  let users = http.get('https://jsonplaceholder.typicode.com/users');
  check(users, { 'GET /users is 200': (r) => r.status === 200 });

  // 5. POST a new post
  let create = http.post(
    'https://jsonplaceholder.typicode.com/posts',
    JSON.stringify({ title: 'test', body: 'body', userId: 1 }),
    { headers: { 'Content-Type': 'application/json' } }
  );
  check(create, { 'POST /posts is 201 or 200': (r) => r.status === 201 || r.status === 200 });

  // tiny pause to simulate real user pacing
  sleep(1);
}
