
var teams = new Map()

class Team {
    constructor(name, descr, img, date) {
        this.name = name
        this.descr = descr
        this.img = img
        this.date = date
        this.soccers = new Map()
    }
}

class Soccers {
    constructor(name,age,img){
        this.name = name
        this.age = age
        this.img = img
    }
}

let team1 = new Team("Dark Knights","The most powerfull Knights!","img/images.jpeg","27/08/1999");
let team2 = new Team("Raimon","Old, but still good","img/raimon.jpg","18/07/1985");
let team3 = new Team("New Raimon","The new Version!","img/newraimon.png","27/08/2008");

teams.set(team1.name,team1)
teams.set(team2.name,team2)
teams.set(team3.name,team3)

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
    let name = document.getElementById("eq_name").value
    let descr = document.getElementById("eq_description").value
    let img = document.getElementById("eq_img").value
    let date = document.getElementById("eq_date").value
    let new_team = new Team(name, descr, img, date)
    addTeam(new_team)
    displayCreateForm()
}

function addTeam(eq) {
    teams.set(eq.name,eq)
    let img
    addToDomTeam(eq)
}
function addToDomTeam(eq){
    document.getElementById("teams_zone").innerHTML += `<div class="card mb-4" id="eq_${eq.name}">
                <img class="card-img-top" src="${eq.img}"/>
    <div class="card-body">
            <div class="small text-muted">${eq.date}</div>
            <h2 class="card-title h4">${eq.name}</h2>
            <p class="card-text">${eq.descr}</p>
            <button class="btn btn-primary" onclick="more_info("${eq.name}")">Read more →</button>
        </div>
    </div>`
}
function displayMoreInfoTeam(eq){
    showHide("main_page")
    showHide("team_info")
    
}
function more_info(eq_name){
    if (! teams.has(eq_name)){
        alert("This team doesn't exist")
    }else{
        displayMoreInfoTeam(teams.get(eq_name))
    }
} 
