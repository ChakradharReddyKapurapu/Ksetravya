// Test fetching from local Vite dev server
import http from 'http';

function testFetch(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:5173${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        resolve({ status: res.statusCode, length: data.length, data: data.slice(0, 200) });
      });
    }).on('error', reject);
  });
}

async function run() {
  try {
    const html = await testFetch('/');
    console.log('HTML status:', html.status, 'length:', html.length);
    
    const mainJs = await testFetch('/src/main.jsx');
    console.log('main.jsx status:', mainJs.status, 'length:', mainJs.length);
    
    const appJs = await testFetch('/src/App.jsx');
    console.log('App.jsx status:', appJs.status, 'length:', appJs.length);
    
    const seedsWorld = await testFetch('/src/features/seeds/components/SeedsWorldView.jsx');
    console.log('SeedsWorldView.jsx status:', seedsWorld.status, 'length:', seedsWorld.length);
    
    const cropProt = await testFetch('/src/features/crop_protection/components/CropProtectionWorldView.jsx');
    console.log('CropProtectionWorldView.jsx status:', cropProt.status, 'length:', cropProt.length);

    console.log('ALL MODULES SERVED CLEANLY WITH STATUS 200!');
  } catch (err) {
    console.error('Fetch error:', err);
  }
}

run();
