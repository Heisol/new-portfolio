import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import mongoClient from '../../local_middleware/mongodb'
import joi from 'joi'
import multer from 'multer'

const handler = nc<NextApiRequest, NextApiResponse>({
    onError: (err: Error, req: NextApiRequest, res: NextApiResponse) => {
      console.error(err.stack);
      res.status(500).end("Something broke!");
    },
    onNoMatch: (req: NextApiRequest, res: NextApiResponse) => {
      res.status(404).end("Page is not found");
    },
});

const reqJoiBody = joi.object({
  session: joi.string().required(),
})

handler.post(async (req: NextApiRequest, res: NextApiResponse)=>{
    const parseBody = JSON.parse(req.body)
    const mongoConnect = await mongoClient.connect()
    const validBody = await reqJoiBody.validateAsync(parseBody)
    if (!validBody) {
        res.send({status: 'error', log: 'Bad request'})
    }
    if (!mongoConnect) {
        res.send({status: 'error', log: 'Internal server error'})
    }
    if (validBody && mongoConnect) {
        const mongoCursor = await mongoClient.db(process.env.DATABASE_NAME).collection('Library').findOne({tag: 'onlySession'})
        const sessionCheck = validBody.session == mongoCursor.hash
        res.send({status: 'success', sessionCheck: sessionCheck})
    }
})

export const config = {
    api: {
      bodyParser: true,
    },
  };
  
export default handler;