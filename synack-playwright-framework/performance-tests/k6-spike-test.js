import http from 'k6/http';
import { check } from 'k6';

export const options = {
  vus: 200,              // instant spike to 200 users
  duration: '15s',       // short burst
  thresholds: {
    http_req_duration: ['p(95)<1000'],  // allow slower response during spike
    http_req_failed: ['rate<0.10'],      // allow up to 10% errors
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');

  check(res, {
    'status is 200': r => r.status === 200,
  });
}
