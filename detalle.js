console.log(localStorage.correo);

function mostrarDetalle(correoUsuario){
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
                let strHTML = `
                <div class="media col-8 mt-2" id="modelo">
                <div class="media-left align-self-center mr-3">
                    <img class="rounded-circle" style="width: inherit;" src="${datos.url}">
                </div>
                <div class="media-body">
                    <h4>${datos.nombre +" "+ datos.apellido}</h4>
                    <p >Correo: ${datos.correo}</p>
                    <p >Fecha de nacimiento: ${datos.fecha} </p>
                    <p >Sexo: ${datos.sexo} </p>
                </div>
            </div>
                `;
                document.getElementById('detalle').innerHTML = strHTML;

                console.log(datos.url);
            }
        };
}

mostrarDetalle(localStorage.correo);