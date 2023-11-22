import express from 'express';
import { __dirname } from './dirname.js'
import teams from './files.js'

const dirStaticHtml = __dirname.substring(0,__dirname.length - 4) + '/public/html/'

const router = express.Router();

router.post('/', (req,res) => {
    console.log(req.body)
})

export default router;