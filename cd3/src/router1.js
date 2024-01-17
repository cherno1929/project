import express from 'express';
import { __dirname } from './dirname.js'
import teams from './teamService.js'

const dirStaticHtml = __dirname.substring(0, __dirname.length - 4) + '/public/html/'

const router = express.Router();

router.get('/', (req, res) => {
    //let teams1 = Array.from(teams.team.values()).slice(0,4)
    res.render("mainElem", {
        //"teams": teams1
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
    let response = {ready : false}
    if (req.body.name == '' || req.body.descr == '' || req.body.img == '') {
        let exist = teams.has(req.body.name)
        res.json(response)
    } else {
        if (teams.has(req.body.name)) {
            res.json(response)
        } else {
            let clasf = req.body.clasified == 'on'
            let soccers = null
            let date = req.body.date
            if (date == '') {
                date = new Date().toJSON().slice(0, 10);
            }
            teams.createTeam(req.body.name, req.body.descr, req.body.img, date, soccers, clasf)
            response.ready = true
            res.json(response)
        }
    }
})

router.get('/loadMoreTeams_json', (req, res) => {
    let from = parseInt(req.query.from)
    let to = parseInt(req.query.to)
    let teams1 = Array.from(teams.team.values()).slice(from, to)
    res.json(teams1)
})

router.get('/loadMoreTeams', (req, res) => {
    let from = parseInt(req.query.from)
    let to = parseInt(req.query.to)
    let teams1 = Array.from(teams.team.values()).slice(from, to)
    res.render("teamsToLoad", {
        "teams": teams1
    })
})

router.get('/searchTeam', (req, res) => {
    let nameToSearch = req.query.name
    let teams1 = []
    Array.from(teams.team.values()).forEach(element => {
        if(element.name.includes(nameToSearch)){
            teams1.push(element)
        }
    });
    res.render("teamsToLoad", {
        "teams": teams1
    })
})

router.get('/searchTeam_json', (req, res) => {
    let nameToSearch = req.query.name
    let teams1 = []
    Array.from(teams.team.values()).forEach(element => {
        if(element.name.includes(nameToSearch)){
            teams1.push(element)
        }
    });
    res.json(teams1)
})

router.get('/filterTeams', (req, res) => {
    let filter = "true" === req.query.filter
    let teams1 = []
    if(filter){
        teams.team.forEach(element => {
            if(element.clasified){
                teams1.push(element)
            }
        });
    }else{
        Array.from(teams.team.values()).forEach(element => {
            teams1.push(element)
        });
    }
    res.render("teamsToLoad", {
        "teams": teams1
    })
})

router.get('/teamsDisponible', (req, res) => {
    let response = {
        disponible : teams.has(req.query.name)
    }
    res.json(response)
})

router.post('/createSoccer', (req, res) => {
    let key = req.query.name
    let validAge = parseInt(req.body.age) < 0
    if (req.body.name == '' || req.body.img == '' || req.body.age == '' || teams.get(req.query.name).soccers.has(req.body.name) || validAge) {
        let team = Array.from(teams.get(key).soccers.values())
        res.render('subElem', {
            "name": teams.get(key).name,
            "descr": teams.get(key).descr,
            "date": teams.get(key).date,
            "img": teams.get(key).img,
            "clasified": teams.get(key).clasified,
            "no_name": req.body.name == '',
            "no_img": req.body.img == '',
            "no_age": req.body.age == '',
            "negative_age": validAge,
            "name_exist": teams.get(req.query.name).soccers.has(req.body.name),
            "teams": team
        })
    } else {
        teams.addSoccer(req.query.name, req.body.name, req.body.age, req.body.img)
        res.redirect('team?name=' + req.query.name)
    }
})

router.post('/addSoccer', (req,res) => {
    let key = req.query.name
    let validAge = parseInt(req.body.age) < 0
    if (!(req.body.name == '' || req.body.img == '' || req.body.age == '' || teams.get(req.query.name).soccers.has(req.body.name) || validAge)) {
        teams.addSoccer(req.query.name, req.body.name, req.body.age, req.body.img)
        res.render('soccersToLoad', {
            'img' : req.body.img,
            'name' : req.body.name,
            'age' : req.body.age
        })
    }
})

router.post('/confirmEditTeam', (req, res) => {
    let key = req.query.name
    let response = {changed : false}
    if (req.body.name == '' || req.body.descr == '' || req.body.img == '') {
        res.json(response)
    } else {
        if (teams.has(req.body.name) && req.body.name != req.query.name) {
            res.json(response)
        } else {
            let team = teams.get(req.query.name)

            if (team.name != req.body.name) {
                teams.team.set(req.body.name, teams.get(team.name))
                teams.delete(team.name)
                team.name = req.body.name
            }
                team.descr = req.body.descr
                team.date = req.body.date
                team.img = req.body.img
                team.clasified = req.body.clasified
            response.changed = true
            res.json(response)
        }
    }
})

export default router;