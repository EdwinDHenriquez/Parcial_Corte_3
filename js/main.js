function login(){
    var user,pass;

    user = document.getElementById("usuario").value;
    pass = document.getElementById("contraseña").value;

    if(user == "admin" && pass == "1234"){
        window.location= "../html/principal.html"
        alert ("Inicio de sesión exitoso!")
    } else {
        alert ("Usted no tiene acceso.")
    }


}