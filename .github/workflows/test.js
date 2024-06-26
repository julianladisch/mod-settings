import { check } from 'k6';
import http from 'k6/http';

export default function () {
  const params = {
    headers: {
      'X-Okapi-Tenant': 'diku',
      'X-Okapi-Permissions': '["mod-settings.entries.item.get", "mod-settings.global.read.mod-circulation"]',
    },
  };
  const res = http.get('http://localhost:8081/settings/entries?query=scope%3D%3D%22mod-circulation%22%20and%20key%3D%3D%22checkoutLockFeature%22', params);
  const ok = check(res, {
    'expect status 200': (r) => r.status === 200,
  });
  if (! ok) {
    console.log('status: ' + res.status + ', body: ' + res.body);
  }
}
