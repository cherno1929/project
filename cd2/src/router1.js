import express from 'express';
import { __dirname } from './dirname.js'
import teams from './files.js'

const dirStaticHtml = __dirname.substring(0,__dirname.length - 4) + '/public/html/'

const router = express.Router();



router.get('/', (req, res) => {
    let teams1 = Array.from(teams.values())
    console.log(teams1[0])
    res.render("mainElem", {
        "teams" : teams1
    })
})

router.get('/createElementForm', (req,res) => {
    res.sendFile(dirStaticHtml + 'createForm.html')
})

export default router;