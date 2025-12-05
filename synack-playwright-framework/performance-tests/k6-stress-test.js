import http from 'k6/http';
import { check } from 'k6';

export const options = {
  stages: [
    { duration: '10s', target: 20 },   // warm-up
    { duration: '20s', target: 100 },  // moderate load
    { duration: '20s', target: 200 },  // stress peak
    { duration: '10s', target: 0 },    // ramp-down
  ],
  thresholds: {
    http_req_duration: ['p(95)<800'],   // allow slightly more latency under stress
    http_req_failed: ['rate<0.05'],      // <5% failures allowed under stress
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');

  check(res, {
    'status is 200': r => r.status === 200,
  });
}
