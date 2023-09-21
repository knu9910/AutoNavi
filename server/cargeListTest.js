const axios = require('axios');

const fetchData = async () => {
  const url = 'http://apis.data.go.kr/B552584/EvCharger/getChargerInfo'; // URL
  const params = {
    serviceKey:
      'eAQALTyCERPEShezhYAMvfw1VKuDHTuXjsmyX/ZXH3aNPr8oE+UIkanSesnxnlpIEE1lPRnWggY+NWTSo7wzsA==', // Service Key

    // zcode를 비워두거나 제거함
  };

  try {
    const response = await axios.get(url, { params });
    console.log('Status:', response.status);
    console.log('Headers:', response.headers);
    console.log('Body:', response.data);
    console.log('item:', response.data.items[0].item);
  } catch (error) {
    console.error('Error:', error);
  }
};

module.exports = fetchData;
