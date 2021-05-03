import redis from "redis";

const client = redis.createClient();

export class RedisManagement {
    async setData(key: string, lifespan: number, data: string): Promise<void> {
        client.setex(key, lifespan, data);
    }

    async getData(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            client.get(key, (err, data) => {
                if(err) reject(err);
                else if(data === null) {
                    resolve("");
                }
                else {
                    resolve(data);
                }
            })
        })
    } 
}

export const redisManagement = new RedisManagement;