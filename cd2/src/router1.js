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
    let team = Array.from(teams.get(req.query.name).soccers.values())
    res.render("subElem", {
        "name": teams.get(req.query.name).name,
        "descr": teams.get(req.query.name).descr,
        "date": teams.get(req.query.name).date,
        "img": teams.get(req.query.name).img,
        "clasified": teams.get(req.query.name).clasified,
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
        "clasified": teams.get(key).clasified
    })
})

router.post('/createTeam', (req, res) => {
    if (req.body.name == '' || req.body.descr == '' || req.body.img == '') {
        let exist = teams.has(req.body.name)
        res.render('errorForm', {
            "no_name": req.body.name == '',
            "no_descr": req.body.descr == '',
            "no_img": req.body.img == '',
            "team_exist": exist
        })
    } else {
        if (teams.has(req.body.name)) {
            res.render('errorForm', {
                "team_exist": true
            })
        } else {
            let clasf = req.body.clasified == 'on'
            let soccers = null
            let date = req.body.date
            console.log(date)
            if (date == '') {
                date = new Date().toJSON().slice(0, 10);
            }
            teams.createTeam(req.body.name, req.body.descr, req.body.img, date, soccers, clasf)
            res.redirect('/team?name=' + req.body.name)
        }
    }
})

router.post('/createSoccer', (req, res) => {
    let key = req.query.name
    if (req.body.name == '' || req.body.img == '' || req.body.age == '' || teams.get(req.query.name).soccers.has(req.body.name)) {
        let team = Array.from(teams.get(key).soccers.values())
        res.render('subElem', {
            "name": teams.get(key).name,
            "descr": teams.get(key).descr,
            "date": teams.get(key).date,
            "img": teams.get(key).img,
            "clasified": teams.get(key).clasified,
            "no_name": req.body.name == '',
            "no_img": req.body.img == '',
            "no_age" : req.body.age == '',
            "name_exist" : teams.get(req.query.name).soccers.has(req.body.name),
            "teams" : team
        })
    } else {
        teams.addSoccer(req.query.name, req.body.name, req.body.age, req.body.img)
        res.redirect('team?name=' + req.query.name)
    }
})

router.post('/confirmEditTeam', (req, res) => {
    let key = req.query.name
    if (req.body.name == '' || req.body.descr == '' || req.body.img == '') {
        res.render('editElem', {
            "no_name": req.body.name == '',
            "no_descr": req.body.descr == '',
            "no_img": req.body.img == '',
            "name": teams.get(key).name,
            "descr": teams.get(key).descr,
            "date": teams.get(key).date,
            "img": teams.get(key).img,
            "clasified": teams.get(key).clasified
        })
    } else {
        if (teams.has(req.body.name) && req.body.name != req.query.name) {
            res.render('editElem', {
                "team_exist": true,
                "name": teams.get(key).name,
                "descr": teams.get(key).descr,
                "date": teams.get(key).date,
                "img": teams.get(key).img,
                "clasified": teams.get(key).clasified
            })
        } else {
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
        }
    }
})

export default router;