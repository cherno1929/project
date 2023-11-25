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

router.get('/deleteTeam', (req, res) => {
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

router.get('/editTeam', (req, res) => {
    let key = req.query.name
    res.render("editElem", {
        "name": teams.get(key).name,
        "descr": teams.get(key).descr,
        "date": teams.get(key).date,
        "img": teams.get(key).img,
    })
})

router.post('/createTeam', (req, res) => {
    teams.createTeam(req.body.name, req.body.descr, req.body.img, req.body.date, [], req.body.clasified)
    res.redirect('/team?name=' + req.body.name)
})

router.post('/createSoccer', (req, res) => {
    teams.addSoccer(req.query.name, req.body.name, req.body.age, req.body.img)
    res.redirect('team?name=' + req.query.name)
})

router.post('/confirmEditTeam', (req, res) => {
    let team = teams.get(req.query.name)

    if (team.name != req.body.name) {
        let copySoccers = [...team.soccers]
        teams.createTeam(req.body.name, req.body.descr, req.body.img, req.body.date, copySoccers, req.body.clasified)
        teams.delete(team.name)
    } else {
        team.descr = req.body.descr
        team.date = req.body.date
        team.img = req.body.img
        team.clasified = req.body.clasified
    }
    res.redirect('team?name=' + req.body.name)
})

export default router;