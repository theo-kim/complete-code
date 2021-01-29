import { resolve } from 'path';
import { Client } from '../client';

const client = new Client(resolve(__dirname + "../../../../client"));

export default client;