import { createClient } from 'redis';
import IORedis, { Redis } from 'ioredis';

let redis_url = process.env.REDIS_URL;
if (process.env.ENVIRONMENT === 'development') {  
//   require('dotenv').config();  
  redis_url = "redis://127.0.0.1"; 
} 

let client = createClient(redis_url);
let redis = new IORedis();

client.set("0", "PWD=/guest;USERNAME=guest;UID=0");

let getUser = function(uid : string) : Promise<String> {
    return new Promise((resolve, reject) => {
        client.get(uid, (err, rep) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rep);
            }
        });
    });
}

export { getUser };