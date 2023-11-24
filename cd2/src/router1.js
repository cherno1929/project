import express from 'express';
import { __dirname } from './dirname.js'
import teams from './files.js'

const dirStaticHtml = __dirname.substring(0, __dirname.length - 4) + '/public/html/'

const router = express.Router();

router.get('/', (req, res) => {
    let teams1 = Array.from(teams.team.values())
    res.render("mainElem", {
        "teams": teams1
    })
})

router.post('/createTeam', (req, res) => {
    teams.createTeam(req.body.name, req.body.descr, req.body.img, req.body.date, [], req.body.check)
    res.redirect('/')
})

router.post('/createSoccer', (req,res) => {
    teams.addSoccer(req.query.name, req.body.name, req.body.age, req.body.img)
    res.redirect('team?name='+req.query.name)
})

router.get('/deleteTeam', (req,res) => {
    teams.delete(req.query.name)
    res.redirect('/')
})

router.get('/createElementForm', (req, res) => {
    res.sendFile(dirStaticHtml + 'createForm.html')
})

router.get('/team', (req, res) => {
    let team = teams.get(req.query.name).soccers
    res.render("subElem", {
        "name": teams.get(req.query.name).name,
        "descr": teams.get(req.query.name).descr,
        "date": teams.get(req.query.name).date,
        "img": teams.get(req.query.name).img,
        "teams": team
    })
})

export default router;