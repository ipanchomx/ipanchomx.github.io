let btnReg = document.getElementsByClassName('btn btn-success mt-3')[0];

let btnLogin = document.getElementById('loginID');


btnReg.setAttribute('disabled', true);

localStorage.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBlZGllbnRlIjoiNzE1NDY4IiwiaWF0IjoxNTczNTg0MzQzfQ.57Eb-AYAfy4vGwzFcfuiGjiWSW1s-CYfl-lhve0Ktyw";

let formReg = document.querySelector('#registro');
//console.log(formReg);
let campos;

let password = document.querySelector('#password');
let confirmPassword = document.querySelector('#confirmPassword');

formReg.addEventListener("change", function(E){
    campos = document.querySelectorAll('#registro input:invalid');
    if(campos.length == 0 && (password.value == confirmPassword.value)){
        btnReg.removeAttribute('disabled');
    }
})

btnReg.onclick = valoresToObject;

function valoresToObject(event){
    event.preventDefault();

    //let newArr = document.querySelectorAll('#registro input');

    let newObj = {
        nombre : document.querySelector('[placeholder="Nombre o nombres"]').value,
        apellido : document.querySelector('[placeholder="Apellidos"]').value,
    };
    let correoValue = "" + document.querySelector('[type="email"]').value;
    newObj.correo = correoValue.toLowerCase();
    newObj.url =  document.querySelector('[type="url"]').value
    let sexo;
    //console.log(document.querySelector('[value="M"]:checked'))
    if(document.querySelector('[value="M"]').checked){
        sexo = 'M';
    }else{
        sexo = 'H';
    }

    newObj.sexo = sexo;

    newObj.fecha = document.querySelector('[type="date"]').value;

    newObj.password = document.querySelector('#password').value;
    newObj.confirmPassword = document.getElementById('confirmPassword').value;
   // console.log(newObj);

    solicitudesBack(newObj, 'POST');

}


function solicitudesBack(obj, typeRequest){
    if(typeRequest == 'GET'){

    }
    else if(typeRequest == 'PUT'){

    }
    else if(typeRequest == 'POST'){
        // 1. Crear XMLHttpRequest object
        let xhr = new XMLHttpRequest();
        // 2. Configurar:  PUT actualizar archivo
        xhr.open('POST','https://users-dasw.herokuapp.com/api/users');
        // 3. indicar tipo de datos JSON
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('x-auth', localStorage.token);
        // 4. Enviar solicitud al servidor
        
        //console.log(obj);
        //console.log(JSON.stringify(obj));

        xhr.send([JSON.stringify(obj)]);
        // 5. Una vez recibida la respuesta del servidor
        xhr.onload = function () {
            if (xhr.status != 201) { // analizar el estatus de la respuesta HTTP
                // Ocurrió un error
                //alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
                alert('Ya existe un usuario con esos datos');
            
            } else {
                //console.log(xhr.responseText); // Significa que fue exitoso
                alert('usuario creadisimo');
            }
        };
    }
    else{
        console.log("Ningun tipo de solicitud");
    }




}


btnLogin.onclick = checkLogin;

function checkLogin(){


    let correOb = "" + document.getElementById('correoId').value;

    let newObj = {
        correo : correOb.toLowerCase(),
        password : document.getElementById('passwordId').value
    }
    
    console.log(newObj);
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('POST','https://users-dasw.herokuapp.com/api/login');
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
    // 4. Enviar solicitud al servidor
    
    //console.log(obj);
    //console.log(JSON.stringify(obj));

    xhr.send([JSON.stringify(newObj)]);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            //alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            alert('Usuario inexistente');
            console.log('denegado');
        
        } else {
            //console.log(xhr.responseText); // Significa que fue exitoso

            console.log('exitoso');
            let newToken = JSON.parse(xhr.responseText);
            localStorage.userToken = newToken.token;
            window.location.href = "/consulta.html";
        }
    };
}

