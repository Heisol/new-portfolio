import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import mongoClient from '../../local_middleware/mongodb'
import joi from 'joi'
import { ObjectId } from 'mongodb';

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
  id: joi.string().required(),
  title: joi.string().required(),
  url: joi.string().required(),
  tags: joi.array().required(),
  description: joi.string().required(),
  dateCreated: joi.date().required(),
  lastModified: joi.date().required(),
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
        let insertCursor = await mongoClient.db(process.env.DATABASE_NAME).collection('Posts').updateOne({
            _id: new ObjectId(validBody.id)
        }, {$set: {
            title: validBody.title,
            url: validBody.url,
            tags: validBody.tags,
            description: validBody.description,
            dateCreated: validBody.dateCreated,
            lastModified: validBody.lastModified,
        }}, {upsert: true})
        if (insertCursor) {
          insertCursor.id = insertCursor._id
          delete insertCursor._id
          res.send({status: 'success', post: insertCursor, log: 'Post updated'})
        }
        else res.send({status: 'fail', post: validBody, log: 'Post not inserted'})
    }
})

export const config = {
    api: {
      bodyParser: true,
    },
  };
  
export default handler;