import type { NextApiRequest, NextApiResponse } from 'next'
import nc from "next-connect";
import mongoClient from '../../local_middleware/mongodb'
import joi from 'joi'
import multer from 'multer'
import bcrypt from 'bcrypt'
import crypto from 'crypto'

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
  email: joi.string().required(),
  password: joi.string().required()
})

const upload = multer()

handler.use(upload.none())
handler.post(async (req: NextApiRequest, res: NextApiResponse)=>{
  const mongoConnect = await mongoClient.connect()
  const validBody = await reqJoiBody.validateAsync(req.body)
  if (!validBody) {
    res.send({status: 'error', log: 'Bad request'})
  }
  if (!mongoConnect) {
    res.send({status: 'error', log: 'Internal server error'})
  }
  if (validBody && mongoConnect) {
    const mongoCursor = await mongoClient.db(process.env.DATABASE_NAME).collection('Library').findOne({tag: 'userCredentials'})
    const emailCheck = validBody.email == mongoCursor.email
    const passwordCheck = bcrypt.compareSync(validBody.password, mongoCursor.password)
    if (emailCheck && passwordCheck) {
      const sessionHash = crypto.randomBytes(8).toString('hex')
      const insertSession = await mongoClient.db(process.env.DATABASE_NAME).collection('Library').updateOne({
        tag: 'onlySession',
      },
      {$set: {hash: sessionHash}},
      {upsert:true})
      res.send({status: 'success', emailCheck: emailCheck, passwordCheck: passwordCheck, hash: sessionHash})
    } else res.send({status: 'success', emailCheck: emailCheck, passwordCheck: passwordCheck})
    
  }
})

export const config = {
    api: {
      bodyParser: false,
    },
  };
  
export default handler;
