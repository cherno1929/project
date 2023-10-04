
class Team {
    constructor(name, descr, img, date) {
        this.name = name
        this.descr = descr
        this.img = img
        this.date = date
    }
}



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
    let new_team = new Team(name, descr, img)
    console.log(new_team)
}

function dom_eq(eq) {
    return `<div class="card mb-4">
                <a href="#!"><img class="card-img-top" src="${eq.img}" alt="..." /></a>
    <div class="card-body">
            <div class="small text-muted">${eq.date}</div>
            <h2 class="card-title h4">${eq.name}</h2>
            <p class="card-text">${eq.descr}</p>
            <button class="btn btn-primary">Read more →</button>
        </div>
    </div>`
}