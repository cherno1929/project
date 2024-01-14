const NUM_LOAD = 4
let cont_Loaded = 0
let filtered = false

let teams = []
let teamNames = new Set()

async function loadMoreElements(){
    let from = (cont_Loaded) * NUM_LOAD
    let to = from + NUM_LOAD

    let response = await fetch(`/loadMoreTeams_json?from=${from}&to=${to}`)

    let loadedTeams = await response.json()

    let zone = document.getElementById("teams_zone")

    if (filtered){
        loadedTeams.forEach(element => {
            if(element.clasified && !teamNames.has(element.name)){
                zone.innerHTML += htmlOfTeam(element)
                teamNames.add(element.name)
                teams.push(element)
            }
        });
    }else{
        loadedTeams.forEach(element => {
            zone.innerHTML += htmlOfTeam(element)
            teams.push(element)
            teamNames.add(element.name)
        });
    }

    cont_Loaded++
} 

async function searchTeam(){
    let teamToSearch = document.getElementById("searchTeamBar").value 

    let response = await fetch(`/searchTeam_json?name=${teamToSearch}`)

    let loadedTeams = await response.json()

    let zone = document.getElementById("teams_zone")
    zone.innerHTML = ""

    teams = []

    if (filtered){
        loadedTeams.forEach(element => {
            if(element.clasified && !teamNames.has(element.name)){
                zone.innerHTML += htmlOfTeam(element)
                teamNames.add(element.name)
                teams.push(element)
            }
        });
    }else{
        loadedTeams.forEach(element => {
            zone.innerHTML += htmlOfTeam(element)
            teams.push(element)
            teamNames.add(element.name)
        });
    }

}

async function filterTeam(){

    filtered = !filtered

    let zone = document.getElementById("teams_zone")


    zone.innerHTML = ""

    if(filtered){
        teams.forEach(element => {
            if(element.clasified){
                zone.innerHTML += htmlOfTeam(element)
            }
        });
    }else{
        teams.forEach(element => {
            zone.innerHTML += htmlOfTeam(element)
        });
    }
}

function htmlOfTeam(team){
    if(team != undefined){
        return `<div class="card mb-4">
                <img class="card-img-top" src=${team.img}>
                <div class="card-body">
                    <div class="small text-muted">${team.date}</div>
                    <h2 class="card-title h4">${team.name}</h2>
                    <p class="card-text">${team.descr}</p>
                    <button class="btn btn-primary" onclick="location.href='/team?name=${team.name}'">Read more →</button>
                </div>
                </div>`
    }else{
        return ""
    }
}

loadMoreElements()
