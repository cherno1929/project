
var teams = new Map()

class Team {
    constructor(name, descr, img, date, soccers) {
        this.name = name
        this.descr = descr
        this.img = img
        this.date = date
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

let soccers1 = []
let soccer1 = new Soccer("Arion", 15, "soccers_img/descarga.jpeg")
let soccer2 = new Soccer("Arion", 15, "soccers_img/descarga.jpeg")
let soccer3 = new Soccer("Arion", 15, "soccers_img/descarga.jpeg")
let soccer4 = new Soccer("Arion", 15, "soccers_img/descarga.jpeg")
let soccer5 = new Soccer("Arion", 15, "soccers_img/descarga.jpeg")
let soccer6 = new Soccer("Arion", 15, "soccers_img/descarga.jpeg")
soccers1.push(soccer1, soccer2, soccer3, soccer4, soccer5, soccer6)

let soccers2 = []
soccers2.push(new Soccer("Arion", 15, "soccers_img/descarga.jpeg"))
soccers2.push(new Soccer("Nathan", 16, "soccers_img/nathan.jpg"))
soccers2.push(new Soccer("Arion", 15, "soccers_img/descarga.jpeg"))
soccers2.push(new Soccer("Arion", 15, "soccers_img/descarga.jpeg"))
soccers2.push(new Soccer("Arion", 15, "soccers_img/descarga.jpeg"))
soccers2.push(new Soccer("Arion", 15, "soccers_img/descarga.jpeg"))

let team1 = new Team("Dark Knights", "The most powerfull Knights!", "img/images.jpeg", "27/08/1999");
let team2 = new Team("Raimon", "Old, but still good", "img/raimon.jpg", "18/07/1985",soccers1);
let team3 = new Team("New Raimon", "The new Version!", "img/newraimon.png", "27/08/2008", soccers1);
let team4 = new Team("Emperadores Oscuros", "Back again", "img/emOsc.png", "22/04/2010",soccers2);
let team5 = new Team("Instituto Zeus", "Gods in the game", "https://static.wikia.nocookie.net/inazuma/images/f/ff/Escudo_Zeus_FF.png/revision/latest/scale-to-width-down/110?cb=20210620190427&path-prefix=es", "3/01/1989",soccers2);
let team6 = new Team("Raimon A", "Secundary of the original", "https://static.wikia.nocookie.net/inazuma/images/b/b3/Ultra_Raimon_%28Logo%29.png/revision/latest?cb=20151228011758&path-prefix=es", "02/07/2002",soccers2);
let team7 = new Team("Galaxy Eleven", "The next champion in the galaxy!", "https://static.wikia.nocookie.net/inazuma/images/b/bd/Earth_Eleven_Emblema.png/revision/latest?cb=20210628231658&path-prefix=es", "30/07/2021",soccer1);
let team8 = new Team("Genesis", "The monsters of the space", "https://static.wikia.nocookie.net/inazuma/images/a/a2/Logo_de_g%C3%A9nesis.png/revision/latest?cb=20120423114023&path-prefix=es", "???",soccers2);
let team9 = new Team("Gir", "The powerfull lovers of the future!", "https://static.wikia.nocookie.net/inazuma/images/1/11/Gir_Emblema.png/revision/latest?cb=20210628154723&path-prefix=es", "??/??/2300",soccers2);
let team10 = new Team("Dark angel", "Divine glory to the dark gods!!", "https://static.wikia.nocookie.net/inazuma/images/1/1b/%C3%81ngel_Oscuro_Emblema.png/revision/latest?cb=20141002231431&path-prefix=es", "06/06/1666",soccers1);

teams.set(team1.name, team1)
teams.set(team2.name, team2)
teams.set(team3.name, team3)
teams.set(team4.name, team4)
teams.set(team5.name, team5)
teams.set(team6.name, team6)
teams.set(team7.name, team7)
teams.set(team8.name, team8)
teams.set(team9.name, team9)
teams.set(team10.name, team10)

teams.forEach(element => {
    addToDomTeam(element)
});

////////////////////////////////////////////////////////////////////////////////////////////////

function showHide(element) {
    let elm = document.getElementById(element)
    if (elm.style.display === "none") {
        elm.style.display = "block"
    } else {
        elm.style.display = "none"
    }
}
function goBackToTeams() {
    displayMoreInfoTeam()
    document.getElementById("main_page").style = ""
}
function displayCreateForm() {
    if (document.getElementById("form_Element").style.display === "none") {
        document.getElementById("create_Button").textContent = "Go back"
    } else {
        document.getElementById("create_Button").textContent = "Create team"
    }
    showHide("form_Element")
    showHide("main_Body")
}

function createTeam() {
    /*
    let name = document.getElementById("eq_name").value
    let descr = document.getElementById("eq_description").value
    let img = document.getElementById("eq_img").value
    let date = document.getElementById("eq_date").value
    let new_team = new Team(name, descr, img, date)
    addTeam(new_team)
    displayCreateForm()
    */
}
function addTeam(eq) {
    teams.set(eq.name, eq)
    addToDomTeam(eq)
}
function addToDomTeam(eq) {
    document.getElementById("teams_zone").innerHTML += `<div class="card mb-4" id="eq_${eq.name}">
                <img class="card-img-top" src="${eq.img}"/>
    <div class="card-body">
            <div class="small text-muted">${eq.date}</div>
            <h2 class="card-title h4">${eq.name}</h2>
            <p class="card-text">${eq.descr}</p>
            <button class="btn btn-primary" onclick="more_info('${eq.name}')">Read more →</button>
        </div>
    </div>`
}
function displayMoreInfoTeam(team) {
    showHide("sub_zone")
    showHide("main_page")
}
function getAllHtmlSoccers(soccers) {
    let text = ""
    if (soccers.length > 0) {
        soccers.forEach(element => {
            text += `<div class="col mb-5">
        <div class="card h-100">
            <!-- Product image-->
            <img class="card-img-top" src="${element.img}"/>
            <!-- Product details-->
            <div class="card-body p-4">
                <div class="text-center">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Name : ${element.name}</li>
                        <li class="list-group-item">Age : ${element.age}</li>
                    </ul>
                </div>
            </div>
            <!-- Product actions-->
            <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                
            </div>
        </div>
    </div>`
        });
    } else {
        text = `<div class="alert alert-danger alertNoSoccers" role="alert">
        <h4 class="alert-heading">Error</h4>
        <p>There are not players yet in this team</p>
        <hr>
        <p class="mb-0">Please add players to this team</p>
      </div>`
    }
    text += ``
    return text
}
function more_info(eq_name) {
    if (!teams.has(eq_name)) {
        alert("This team doesn't exist")
    } else {
        displayMoreInfoTeam(teams.get(eq_name))
        document.getElementById("imgEq").src = teams.get(eq_name).img
        document.getElementById("soccers").innerHTML = getAllHtmlSoccers(teams.get(eq_name).soccers)
    }
} 
