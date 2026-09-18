const fs = require('fs');

async function testUpload() {
  const fileContent = 'dummy image content';
  fs.writeFileSync('dummy.jpg', fileContent);
  
  const formData = new FormData();
  const fileObj = new Blob([fileContent], { type: 'image/jpeg' });
  formData.append('file', fileObj, 'dummy.jpg');

  const url = 'http://localhost:3000/api';
  console.log('Testing upload...');
  const response = await fetch(`${url}/media/upload`, {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  console.log('Upload response:', data);

  if (data.success) {
    console.log('Testing URL accessibility:', data.data.url);
    const getRes = await fetch(data.data.url);
    console.log('GET URL status:', getRes.status);
    
    console.log('Testing deletion...');
    const delRes = await fetch(`${url}/media/${data.data.id}`, { method: 'DELETE' });
    console.log('Delete response:', await delRes.json());
  }

  fs.unlinkSync('dummy.jpg');
}

testUpload();
