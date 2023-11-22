import express from 'express';
import { __dirname } from './dirname.js'
import teams from './files.js'

const dirStaticHtml = __dirname.substring(0,__dirname.length - 4) + '/public/html/'

const router = express.Router();

router.get('/', (req, res) => {
    let teams1 = Array.from(teams.values())
    res.render("mainElem", {
        "teams" : teams1
    })
})

router.post('/createTeam', (req,res) => {
    console.log(req.body)
})

router.get('/createElementForm', (req,res) => {
    res.sendFile(dirStaticHtml + 'createForm.html')
})

router.get('/team', (req,res) => {
    console.log(req.query.name)
    let team = teams.get(req.query.name).soccers
    console.log(team[0])
    res.render("subElem", {
        "name" : teams.get(req.query.name).name,
        "descr" : teams.get(req.query.name).descr,
        "date" : teams.get(req.query.name).date,
        "img" : teams.get(req.query.name).img,
        "teams" : team
    })
})

export default router;