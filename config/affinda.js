const axios = require('axios');
const FormData = require('form-data');

const AFFINDA_API_KEY = process.env.AFFINDA_API_KEY;
const AFFINDA_URL = 'https://api.affinda.com/v2/resumes';

async function parseResume(buffer) {
  const formData = new FormData();
  formData.append('file',buffer,{   
  
        filename:'resume.pdf',
        contentType:'application/pdf',

  });

  const response = await axios.post(AFFINDA_URL, formData, {
    headers: {
      'Authorization': `Bearer ${AFFINDA_API_KEY}`,
      ...formData.getHeaders(),
    },
  });
  return response.data;
}

module.exports = { parseResume }; 