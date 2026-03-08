// Beta signup verification script
const BACKEND = 'http://localhost:3001';

async function test() {
    console.log('=== Beta Signup Verification ===\n');

    // Test 1: Successful signup
    console.log('1. Testing successful signup...');
    try {
        const res = await fetch(`${BACKEND}/api/beta/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Creator',
                email: 'testcreator@example.com',
                channelLink: 'https://youtube.com/@testcreator',
                contactNumber: '+91 9876543210'
            })
        });
        const data = await res.json();
        console.log(`   Status: ${res.status}`, data.success ? '✅ PASS' : '❌ FAIL');
        console.log('   Response:', JSON.stringify(data));
    } catch (e) { console.error('   ❌ Error:', e.message); }

    // Test 2: Duplicate email
    console.log('\n2. Testing duplicate email...');
    try {
        const res = await fetch(`${BACKEND}/api/beta/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Test Creator 2',
                email: 'testcreator@example.com'
            })
        });
        const data = await res.json();
        console.log(`   Status: ${res.status}`, res.status === 409 ? '✅ PASS' : '❌ FAIL');
        console.log('   Response:', JSON.stringify(data));
    } catch (e) { console.error('   ❌ Error:', e.message); }

    // Test 3: Missing fields
    console.log('\n3. Testing missing fields...');
    try {
        const res = await fetch(`${BACKEND}/api/beta/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: '' })
        });
        const data = await res.json();
        console.log(`   Status: ${res.status}`, res.status === 400 ? '✅ PASS' : '❌ FAIL');
        console.log('   Response:', JSON.stringify(data));
    } catch (e) { console.error('   ❌ Error:', e.message); }

    // Test 4: Invalid email
    console.log('\n4. Testing invalid email...');
    try {
        const res = await fetch(`${BACKEND}/api/beta/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Bad Email', email: 'not-an-email' })
        });
        const data = await res.json();
        console.log(`   Status: ${res.status}`, res.status === 400 ? '✅ PASS' : '❌ FAIL');
        console.log('   Response:', JSON.stringify(data));
    } catch (e) { console.error('   ❌ Error:', e.message); }

    console.log('\n=== Verification Complete ===');
}

test();
