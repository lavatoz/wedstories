const url = 'http://localhost:3000/api';

async function testApi() {
  console.log('4. GET /api/health');
  const h = await fetch(`${url}/health`).then(r => r.json());
  console.log(h);

  console.log('\n5. GET /api/templates');
  const t = await fetch(`${url}/templates`).then(r => r.json());
  console.log('Templates found:', t.data?.length);

  console.log('\n6. POST invitation');
  const postRes = await fetch(`${url}/invitations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      templateId: 'kerala-kasavu',
      brideName: 'QA',
      groomName: 'Tester',
      weddingDate: '2026-10-10',
      weddingTime: '10:00 AM',
      venue: 'Test Venue',
      location: 'Test Location',
      events: []
    })
  });
  const postData = await postRes.json();
  console.log('Created:', postData.data?.slug);
  const slug = postData.data?.slug;

  console.log('\n10. duplicate slug handling');
  const postRes2 = await fetch(`${url}/invitations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      templateId: 'kerala-kasavu',
      brideName: 'QA',
      groomName: 'Tester',
      weddingDate: '2026-10-10',
      weddingTime: '10:00 AM',
      venue: 'Test Venue',
      location: 'Test Location',
      events: []
    })
  });
  const postData2 = await postRes2.json();
  console.log('Duplicate Slug Created:', postData2.data?.slug);

  console.log('\n7. GET invitation');
  const getRes = await fetch(`${url}/invitations/${slug}`);
  console.log('Fetched:', (await getRes.json()).data?.slug);

  console.log('\n8. PUT invitation');
  const putRes = await fetch(`${url}/invitations/${slug}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      templateId: 'kerala-kasavu',
      brideName: 'QA Updated',
      groomName: 'Tester',
      weddingDate: '2026-10-10',
      weddingTime: '10:00 AM',
      venue: 'Test Venue',
      location: 'Test Location',
      events: []
    })
  });
  console.log('Updated:', (await putRes.json()).data?.brideName);

  console.log('\n11. invalid payload validation');
  const invalidRes = await fetch(`${url}/invitations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      templateId: 'kerala-kasavu'
    })
  });
  console.log('Invalid:', await invalidRes.json());

  console.log('\n12. nonexistent invitation');
  const nonRes = await fetch(`${url}/invitations/does-not-exist`);
  console.log('Nonexistent status:', nonRes.status);
  console.log('Nonexistent body:', await nonRes.json());

  console.log('\n9. DELETE invitation');
  const delRes = await fetch(`${url}/invitations/${slug}`, { method: 'DELETE' });
  console.log('Deleted:', await delRes.json());
}
testApi();
