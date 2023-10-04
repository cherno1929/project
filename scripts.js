
/*
    Dark mode 
    <i class="bi bi-moon"></i>
    <i class="bi bi-moon-fill"></i>
*/
function showHide(element){
    let elm = document.getElementById(element)
    if (elm.style.display === "none"){
        elm.style.display = "block"
    }else{
        elm.style.display = "none"
    }
}
function displayCreateForm(){
    if (document.getElementById("form_Element").style.display === "none"){
        document.getElementById("create_Button").textContent = "Go back"
    }else{
        document.getElementById("create_Button").textContent = "Create team"
    }
    showHide("form_Element")
    showHide("main_Body")
}
