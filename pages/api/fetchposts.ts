import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import mongoClient from '../../local_middleware/mongodb'

const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err: Error, req: NextApiRequest, res: NextApiResponse) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
      res.status(404).end("Page is not found");
    },
});

handler.get(async (req: NextApiRequest, res: NextApiResponse)=>{
    const mongoConnect = await mongoClient.connect()
    if (!mongoConnect) {
        res.send({status: 'error', log: 'Internal server error'})
    }
    if (mongoConnect) {
        const mongoCursor = await mongoClient.db('Portfolio').collection('Posts').find().toArray()
        try {
          if (mongoCursor) res.send({status: 'success', posts: mongoCursor})
        } catch (error:any) {
          res.send({status: 'error', log: error.message || 'error'})
        }
    }
})

export const config = {
    api: {
      bodyParser: true,
    },
  };
  
export default handler;