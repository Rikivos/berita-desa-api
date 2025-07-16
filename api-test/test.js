import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10, // 20 virtual users (simulasi 20 orang)
  duration: '10s', // durasi tes
};

export default function () {
  const res = http.get('http://localhost:3000/api/posts?page=1');

  // Cek respons sukses
  check(res, {
    'status 200': (r) => r.status === 200,
  });

  sleep(1); // jeda antar request (simulasi pengguna manusia)
}
