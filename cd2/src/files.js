class Teams {
    constructor(){
        this.team = new Map()
    }

    set(teamx){
        this.team.set(teamx.name, teamx)
    }

    get(name){
        return this.team.get(name)
    }

    delete(name){
        this.team.delete(name)
    }

    createTeam(name, descr, img, date, soccers,clasified){
        let newTeam = new Team(name, descr, img, date, soccers,clasified)
        this.set(newTeam)
    }

    addSoccer(nameTeam, nameSoccer, ageSoccer, imgSoccer){
        let newSoccer = new Soccer(nameSoccer,ageSoccer,imgSoccer)
        this.team.get(nameTeam).soccers.push(newSoccer)
    }
}

var teams = new Teams()

class Team {
    constructor(name, descr, img, date, soccers,clasified) {
        this.name = name
        this.descr = descr
        this.img = img
        this.date = date
        this.clasified = clasified
        if (soccers === null || soccers === undefined) {
            this.soccers = []
        } else {
            this.soccers = soccers
        }
    }
}

class Soccer {
    constructor(name, age, img) {
        this.name = name
        this.age = age
        this.img = img
    }
}

let soccers2 = []
soccers2.push(new Soccer("Mark", 15, "https://ih1.redbubble.net/image.275077163.3286/raf,750x1000,075,t,FFFFFF:97ab1c12de.u3.jpg"))
soccers2.push(new Soccer("Jack", 15, "https://static.wikia.nocookie.net/inazuma/images/6/69/%28IJ%29_Jack.png/revision/latest?cb=20230909201948&path-prefix=es"))
soccers2.push(new Soccer("Nathan", 17, "https://static.wikia.nocookie.net/inazuma/images/6/64/%28IJ%29_Nathan.png/revision/latest?cb=20230909202003&path-prefix=es"))
soccers2.push(new Soccer("Hurley", 17, "https://static.wikia.nocookie.net/inazuma/images/9/9c/%28IJ%29_Hurley.png/revision/latest?cb=20230909201944&path-prefix=es"))
soccers2.push(new Soccer("Scott", 14, "https://static.wikia.nocookie.net/inazuma/images/8/82/%28IJ%29_Scotty.png/revision/latest?cb=20230909202012&path-prefix=es"))
soccers2.push(new Soccer("Archer", 15, "https://static.wikia.nocookie.net/inazuma/images/4/42/%28IJ%29_Archer.png/revision/latest?cb=20230909201926&path-prefix=es"))
soccers2.push(new Soccer("Caleb", 16, "https://static.wikia.nocookie.net/inazuma/images/7/7d/%28IJ%29_Caleb.png/revision/latest?cb=20230909201937&path-prefix=es"))
soccers2.push(new Soccer("Shawn", 16, "https://static.wikia.nocookie.net/inazuma/images/a/a7/%28IJ%29_Shawn.png/revision/latest?cb=20230909202015&path-prefix=es"))
soccers2.push(new Soccer("Axel", 16, "https://static.wikia.nocookie.net/inazuma/images/3/3c/%28IJ%29_Axel.png/revision/latest?cb=20230909201935&path-prefix=es"))
soccers2.push(new Soccer("Austin", 14, "https://static.wikia.nocookie.net/inazuma/images/0/0e/%28IJ%29_Austin.png/revision/latest?cb=20230909201930&path-prefix=es"))

let team5 = new Team("Instituto Zeus", "Gods in the game", "https://i.ibb.co/rKh0skm/Escudo-Zeus-FF.webp");
let team6 = new Team("Raimon A", "Secundary of the original", "https://static.wikia.nocookie.net/inazuma/images/b/b3/Ultra_Raimon_%28Logo%29.png/revision/latest?cb=20151228011758&path-prefix=es", "02/07/2002");
let team7 = new Team("Galaxy Eleven", "The next champion in the galaxy!", "https://static.wikia.nocookie.net/inazuma/images/b/bd/Earth_Eleven_Emblema.png/revision/latest?cb=20210628231658&path-prefix=es", "30/07/2021");
let team8 = new Team("Genesis", "The monsters of the space", "https://static.wikia.nocookie.net/inazuma/images/a/a2/Logo_de_g%C3%A9nesis.png/revision/latest?cb=20120423114023&path-prefix=es", "???");
let team9 = new Team("Gir", "The powerfull lovers of the future!", "https://static.wikia.nocookie.net/inazuma/images/1/11/Gir_Emblema.png/revision/latest?cb=20210628154723&path-prefix=es", "??/??/2300");
let team10 = new Team("Dark angel", "Divine glory to the dark gods!!", "https://static.wikia.nocookie.net/inazuma/images/1/1b/%C3%81ngel_Oscuro_Emblema.png/revision/latest?cb=20141002231431&path-prefix=es", "06/06/1666");
let team2 = new Team("Raimon", "Old, but still good", "https://files.cults3d.com/uploaders/22012644/illustration-file/5ac307a2-a210-4fd4-ab1d-c43d7d7ac961/raimon.jpg", "18/07/1985", soccers2);

teams.set(team2)

teams.set(team5)
teams.set(team6)
teams.set(team7)
teams.set(team8)
teams.set(team9)
teams.set(team10)

export default teams