solicitarUsuarios();

//let usersGlobal = [];

let fechaUs;
let sexoUS;

function solicitarUsuarios(){
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', 'https://users-dasw.herokuapp.com/api/users');

    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
    xhr.setRequestHeader('x-user-token', localStorage.userToken);
    // 4. Enviar solicitud
    xhr.send();

    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {

        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            console.log(localStorage.userToken);
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            //cbErr(xhr.status + ': ' + xhr.statusText);

        } else {
            let datos = JSON.parse(xhr.response); //esta es la línea que hay que probar
            // Ejecutar algo si todo está correcto
            //console.log(datos); // Significa que fue exitoso
            //cbOk(datos);
            
            console.log(datos);
            
            for(let i = 0; i < datos.length; i++){

                // 1. Crear XMLHttpRequest object
                let xhr = new XMLHttpRequest();

                // 2. Configurar: PUT actualizar archivo
                xhr.open('GET', 'https://users-dasw.herokuapp.com/api/users/' + datos[i].correo);
            
                // 3. indicar tipo de datos JSON
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.setRequestHeader('x-auth', localStorage.token);
                xhr.setRequestHeader('x-user-token', localStorage.userToken);
                // 4. Enviar solicitud
                xhr.send();
            
                // 5. Una vez recibida la respuesta del servidor
                xhr.onload = function () {
            
                    if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
                        // Ocurrió un error
                        console.log(localStorage.userToken);
                        alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
                        //cbErr(xhr.status + ': ' + xhr.statusText);
            
                    } else {
                        let datos = JSON.parse(xhr.response); //esta es la línea que hay que probar
                        // Ejecutar algo si todo está correcto
                        //console.log(datos); // Significa que fue exitoso
                        //cbOk(datos);
                        console.log(datos);
                        sexoUS = datos.sexo;
                        sexoUS = (sexoUS=='M') ? 'Mujer' : 'Hombre';
                        console.log(sexoUS);
                        fechaUs = datos.fecha;
                        
                        console.log(fechaUs);
                        let newHTML = `
                        <div class="row  mt-4" id="lista">
                            <div class="media col-8 mt-2" id="modelo">
                                <div class="media-left align-self-center mr-3">
                                    <img class="rounded-circle" style="width: inherit;" src="${datos.url}">
                                </div>
                                <div class="media-body">
                                    <h4>${datos.nombre + " " +  datos.apellido}</h4>
                                    <p >Correo: ${datos.correo}</p>
                                    <p >Fecha de nacimiento: ${fechaUs} </p>
                                    <p >Sexo: ${sexoUS} </p>
                                </div>
                                <div class="media-right align-self-center">
                                    <div class="row">
                                        <button onclick="verDetalle('${datos.correo}')" class="btn btn-primary edit"><i class="fas fa-search edit"></i></button>
                                    </div>
                                    <div class="row">
                                        <button onclick="editar('${datos.correo}')" class="btn btn-primary mt-2" data-toggle="modal" data-target="#registro"><i class="fas fa-pencil-alt edit"></i></button>
                                    </div>
                                    <div class="row">
                                        <button onclick="eliminar('${datos.correo}')" class="btn btn-primary mt-2" data-toggle="modal" data-target="#borrar"><i class="fas fa-trash-alt remove"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        
        
                        document.getElementById('usuarios').innerHTML += newHTML;
                    }
                };


                

            }
        }
    };
}


function editar(correoUsuario){
    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', 'https://users-dasw.herokuapp.com/api/users/' + correoUsuario);

    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
    xhr.setRequestHeader('x-user-token', localStorage.userToken);
    // 4. Enviar solicitud
    xhr.send();

    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {

        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            console.log(localStorage.userToken);
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            //cbErr(xhr.status + ': ' + xhr.statusText);

        } else {
            let datos = JSON.parse(xhr.response); //esta es la línea que hay que probar
            // Ejecutar algo si todo está correcto
            //console.log(datos); // Significa que fue exitoso
            //cbOk(datos);
            
            console.log(datos);
            
            document.querySelector('[placeholder="Nombre o nombres"]').value = datos.nombre;
            document.querySelector('[placeholder="Apellidos"]').value = datos.apellido;
            document.querySelector('[type="email"]').value = datos.correo;
            document.querySelector('[type="url"]').value = datos.url;
            
            document.querySelector('[type="date"]').value = datos.fecha;
            document.querySelector('#password').value = datos.password;
            document.getElementById('confirmPassword').value = datos.password;
            if(datos.sexo == 'M'){
                document.querySelector('[value="M"]').checked = true;
            }
            else{
                document.querySelector('[value="H"]').checked = true;
            }

            //console.log(datos.confirmPassword);
//            document.querySelector('[type="email"]').classList.add('disabled');

            
            
        }
    };
}

let btnActualizar = document.getElementById('btnActualizar');

btnActualizar.onclick = actualizarUsuario;

function actualizarUsuario(event){
    event.preventDefault();
    let newObj = {
        nombre : document.querySelector('[placeholder="Nombre o nombres"]').value,
        apellido : document.querySelector('[placeholder="Apellidos"]').value,
    };
    let correoValue = "" + document.querySelector('[type="email"]').value;
    newObj.correo = correoValue.toLowerCase();
    newObj.url =  document.querySelector('[type="url"]').value;
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
   // console.log(newObj);

    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    console.log('Solicitud');
    console.log(newObj);
    console.log(newObj.correo);
    xhr.open('PUT','https://users-dasw.herokuapp.com/api/users/'+ newObj.correo);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
    xhr.setRequestHeader('x-user-token', localStorage.userToken);
    // 4. Enviar solicitud al servidor
    xhr.send([JSON.stringify(newObj)]);
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            //alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            alert('Ya existe un usuario con esos datos');
        
        } else {
            //console.log(xhr.responseText); // Significa que fue exitoso
            alert('usuario editadisimo');
            //solicitarUsuarios();
            //document.getElementById('usuarios').innerHTML = "";
            //solicitarUsuarios();
            location.reload();
        }
    };    

}


function eliminar(correoUsuario){

    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // 2. Configurar: PUT actualizar archivo
    xhr.open('GET', 'https://users-dasw.herokuapp.com/api/users/' + correoUsuario);

    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
    xhr.setRequestHeader('x-user-token', localStorage.userToken);
    // 4. Enviar solicitud
    xhr.send();

    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {

        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            console.log(localStorage.userToken);
            alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            //cbErr(xhr.status + ': ' + xhr.statusText);

        } else {
            let datos = JSON.parse(xhr.response); //esta es la línea que hay que probar
            // Ejecutar algo si todo está correcto
            //console.log(datos); // Significa que fue exitoso
            //cbOk(datos);
            
            console.log(datos);
            
            document.getElementById('inputNameBorrar').value = datos.nombre;
            document.getElementById('inputApellidoBorrar').value = datos.apellido;
            document.getElementById('inputCorreoBorrar').value = datos.correo;
            document.getElementById('inputImagenBorrar').value = datos.url;
            
            document.getElementById('inputFechaBorrar').value = datos.fecha;
            document.getElementById('passwordBorrar').value = datos.password;
            document.getElementById('confirmPasswordBorrar').value = datos.password;
            if(datos.sexo == 'M'){
                document.getElementById('inputMujerBorrar').checked = true;
            }
            else{
                document.getElementById('inputHombreBorrar').checked = true;
            }

            //console.log(datos.confirmPassword);
//            document.querySelector('[type="email"]').classList.add('disabled');
            
        }
    };
}

let btnConfirmar = document.getElementById('btnActualizarBorrar');

btnConfirmar.onclick = borrarYActualizar;

function borrarYActualizar(event){
    event.preventDefault();

    // 1. Crear XMLHttpRequest object
    let xhr = new XMLHttpRequest();
    // 2. Configurar:  PUT actualizar archivo
    xhr.open('DELETE','https://users-dasw.herokuapp.com/api/users/'+ document.getElementById('inputCorreoBorrar').value);
    // 3. indicar tipo de datos JSON
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('x-auth', localStorage.token);
    xhr.setRequestHeader('x-user-token', localStorage.userToken);
    // 4. Enviar solicitud al servidor
    xhr.send();
    // 5. Una vez recibida la respuesta del servidor
    xhr.onload = function () {
        if (xhr.status != 200) { // analizar el estatus de la respuesta HTTP
            // Ocurrió un error
            //alert(xhr.status + ': ' + xhr.statusText); // e.g. 404: Not Found
            alert('Ya existe un usuario con esos datos');
        
        } else {
            //console.log(xhr.responseText); // Significa que fue exitoso
            alert('usuario eliminadisimo');
            //solicitarUsuarios();
           // document.getElementById('usuarios').innerHTML = "";
            //solicitarUsuarios();
            location.reload();
        }
    };
}

function verDetalle(correoUsuario){
    localStorage.correo = correoUsuario;
    console.log(localStorage.correo);
    window.location.href = "/detalle.html";
}

