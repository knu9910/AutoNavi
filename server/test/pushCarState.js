/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const carstate1 = require('./carstate1');
const carstate2 = require('./carstate2');
const axios = require('axios');
const {setTimeout} = require('timers/promises');

const simulator = {
  async start(stateList){
    try{
      for(let state of stateList){
        const res = await axios.patch('http://localhost:8080/api/real/realcar', state);
        console.log(res.data);
        await setTimeout(1000*2);        
      }
    }catch(err){
      console.error(err);
    }
  }
};

(async ()=>{
  simulator.start(carstate1);
  await setTimeout(1000*1);
  simulator.start(carstate2);
})();
