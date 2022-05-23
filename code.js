//Definición de variables
const url = 'http://127.0.0.1:3050/pac'
const contenedor = document.querySelector('tbody')
let resultados = ''

const modalPaciente = new bootstrap.Modal(document.getElementById('modalPaciente'))
const formPaciente = document.querySelector('form')
const Nom_Apellido = document.getElementById('Nom_Apellido')
const edad_paciente = document.getElementById('edad_paciente')
const correo_paciente = document.getElementById('correo_paciente')
const Fecha_Hora = document.getElementById('Fecha_Hora')
const Estado = document.getElementById('Estado')
var opcion = ''

btnCrear.addEventListener('click', ()=>{
    Nom_Apellido.value = ''
    edad_paciente.value = ''
    correo_paciente.value = ''
    Fecha_Hora.value = ''
    Estado.value = ''
    modalPaciente.show()
    opcion = 'crear'
})

//funcion para mostrar los resultados
const mostrar = (paciente) => {
    paciente.forEach(pacientes => {
        resultados += `<tr>
                            <td>${pacientes.id_paciente}</td>
                            <td>${pacientes.Nom_Apellido}</td>
                            <td>${pacientes.edad_paciente}</td>
                            <td>${pacientes.correo_paciente}</td>
                            <td>${pacientes.Fecha_Hora}</td>
                            <td>${pacientes.Estado}</td>
                            <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a><a class="btnBorrar btn btn-danger">Borrar</a></td>
                       </tr>
                    `    
    })
    contenedor.innerHTML = resultados
    
}

//Procedimiento Mostrar
fetch(url)
    .then( response => response.json() )
    .then( data => mostrar(data) )
    .catch( error => console.log(error))

  
const on = (element, event, selector, handler) => {
    //console.log(element)
    //console.log(event)
    //console.log(selector)
    //console.log(handler)
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

//Procedimiento Borrar
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id_paciente = fila.firstElementChild.innerHTML
    alertify.confirm("This is a confirm dialog.", 
    function a (){
        fetch(url+id_paciente, {
            method: 'DELETE'
        })
        .then( res => res.json() )
        .then( ()=> location.reload())
        //alertify.success('Ok')
    },
    function(){
        alertify.error('Cancel')
    })
})

//Procedimiento Editar
let idForm = 0
on(document, 'click', '.btnEditar', e => {    
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const Nom_ApellidoForm = fila.children[1].innerHTML
    const edad_pacienteForm = fila.children[2].innerHTML
    const correo_pacienteForm = fila.children[3].innerHTML
    const Fecha_HoraForm = fila.children[4].innerHTML
    const EstadoForm = fila.children[5].innerHTML
    Nom_Apellido.value =  Nom_ApellidoForm
    edad_paciente.value =  edad_pacienteForm
    correo_paciente.value =  correo_pacienteForm
    Fecha_Hora.value =  Fecha_HoraForm
    Estado.value =  EstadoForm
    opcion = 'editar'
    modalPaciente.show()
     
})

//Procedimiento para Crear y Editar
formPaciente.addEventListener('submit', (e)=>{
    e.preventDefault()
    if(opcion=='crear'){        
        //console.log('OPCION CREAR')
        fetch(url, {
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                Nom_Apellido:Nom_Apellido.value,
                edad_paciente:edad_paciente.value,
                correo_paciente:correo_paciente.value,
                Fecha_Hora:Fecha_Hora.value,
                Estado:Estado.value
            })
        })
        .then( response => response.json() )
        .then( data => {
            const nuevoPaciente = []
            nuevoPaciente.push(data)
            mostrar(nuevoPaciente)
        })
    }
    if(opcion=='editar'){    
        //console.log('OPCION EDITAR')
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                Nom_Apellido:Nom_Apellido.value,
                edad_paciente:edad_paciente.value,
                correo_paciente:correo_paciente.value,
                Fecha_Hora:Fecha_Hora.value,
                Estado:Estado.value
            })
        })
        .then( response => response.json() )
        .then( response => location.reload() )
    }
    modalPaciente.hide()
})

