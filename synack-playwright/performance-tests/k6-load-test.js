import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 50,               // 50 virtual users
  duration: '30s',       // run test for 30 seconds
  thresholds: {
    http_req_duration: ['p(95)<500'],   // 95% of requests must be < 500ms
    http_req_failed: ['rate<0.01'],      // error rate < 1%
  },
};

export default function () {
  const res = http.get('https://jsonplaceholder.typicode.com/posts');

  check(res, {
    'status is 200': r => r.status === 200,
    'response time < 500ms': r => r.timings.duration < 500,
  });

  sleep(1); // simulate user "think time"
}
