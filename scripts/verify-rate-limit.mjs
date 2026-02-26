import { setTimeout } from 'timers/promises';

const endpoint = 'http://localhost:3000/api/contact';
const healthCheck = 'http://localhost:3000';

async function waitForServer() {
  console.log('Waiting for server to be ready...');
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetch(healthCheck);
      if (res.ok) {
        console.log('Server is ready.');
        return;
      }
    } catch (e) {
      // ignore
    }
    await setTimeout(1000);
  }
  console.error('Server failed to start within 30 seconds.');
  process.exit(1);
}

async function sendRequest(i) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test',
        email: 'test@example.com',
        brief: 'Test brief'
      })
    });
    console.log(`Request ${i}: Status ${res.status}`);
    return res.status;
  } catch (e) {
    console.error(`Request ${i} failed:`, e.message);
    return 0;
  }
}

async function main() {
  await waitForServer();

  let rateLimited = false;
  // Send 7 requests. Limit is 5.
  for (let i = 1; i <= 7; i++) {
    const status = await sendRequest(i);
    if (status === 429) {
        console.log("Rate limit hit at request", i);
        rateLimited = true;
        break;
    }
    await setTimeout(100);
  }

  if (rateLimited) {
      console.log("SUCCESS: Rate limit verification passed.");
      process.exit(0);
  } else {
      console.error("FAILURE: Rate limit not hit within 7 requests.");
      process.exit(1);
  }
}

main();
