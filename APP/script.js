//Javier de la Rubia Sánchez

window.addEventListener('DOMContentLoaded',(event) =>{
  init()
  document.getElementById("crearCuenta").addEventListener("click",()=>{iniciarlizarDatos()})
  document.getElementById("guardar").addEventListener("click",(e)=>{
      let valido = true;
      if (confirm("¿Estas seguro de enviar el formulario?")){      
          if (validarCantidadTrans()&validarFechaTrans()&validarNombreTrans()) {
              addTransaccion({                                                                      
              tipo : document.getElementById("tipoTrans").value,
              categoria : document.getElementById('categoriaTrans').value,
              cantidad : document.getElementById('cantidadTrans').value,
              nombre : document.getElementById('nombreTrans').value,
              fecha : document.getElementById('fechaTrans').value});
          }else{
              valido = false;
              e.preventDefault();
          }
      }else{
          valido = false;
          e.preventDefault();
      }
      return valido;
  })
  document.getElementById("guardarCuenta").addEventListener("click",(e)=>{
    let valido = true;
    if (confirm("¿Sustituiras esta cuenta,estas seguro? Si necesitas mas Slots, activa premium")){      
      if (validarNombreCuenta()) {
            addCuenta({                                                                      
            ingreso : 0,
            gastoFijo : 0,
            gastoVariable : 0,
            listaTrans : [],
            slot:document.getElementById("slotCuenta").value,
            nombreCuenta :document.getElementById("nombreCuenta").value});
        }else{
            valido = false;
            e.preventDefault();
        }
    }else{
        valido = false;
        e.preventDefault();
    }
    return valido;
})
  document.getElementById("addTrans").addEventListener("click",()=>{mostrarVentanaTrans()})
  document.getElementById("selectSlot").addEventListener("change",()=>{mostrarNombreCuenta(),pintaPastel()})
});

//Objeto cuenta corriente
  let cuenta_DOM;
 const cuenta={
      ingreso : 0,
      gastoFijo : 0,
      gastoVariable : 0,
      listaTrans : [],
      nombreCuenta :""
  };

//Pinta Grafica Pastel
  function pintaPastel() {
    let slot= document.getElementById("selectSlot").value;
    const cuentaLocal = JSON.parse(localStorage.getItem(slot));
    if (cuentaLocal=== null) {
      document.getElementById("chart-wrapper").innerHTML="";
    }else{
      document.getElementById("chart-wrapper").innerHTML="";
      document.getElementById("chart-wrapper").innerHTML='<canvas id="myChart" class="pie"></canvas>';
      let ctx = document.getElementById("myChart").getContext("2d");
      let myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          datasets: [{
            data: [cuentaLocal.ingreso,cuentaLocal.gastoFijo,cuentaLocal.gastoVariable],
            backgroundColor: ["#e23e31","#323d40","#2a2a2a"],
            
          }],
          labels: ["Ingresos","Gastos Fijos","Gastos Variables"],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            position: 'bottom',
            display: true,
          },
        }
    })
    Chart.pluginService.register({
      beforeDraw: function(chart) {
        let width = chart.chart.width,
            height = chart.chart.height,
            ctx = chart.chart.ctx;
        ctx.restore();
        let fontSize = (height / 114).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = '#323d40';
        let text=totalCuenta();
        let   textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    });
  }
}
const TipoTrans = {
  Ingreso : "Ingreso",
  GastosFijos : "Gastos Fijos",
  GastosVariables : "Gastos Variables"
}
const Categoria = {
  Comida : "Comida",
  Viaje : "Viaje",
  Entretenimiento : "Entretenimiento"

}
const Transaccion = {
    tipo : TipoTrans,
    categoria : Categoria,
    cantidad : 0,
    nombre : "",
    fecha : Date
   
}
function totalCuenta() {
  let slot= document.getElementById("selectSlot").value;
  const cuentaLocal = JSON.parse(localStorage.getItem(slot));
  let vIngreso= cuentaLocal.ingreso;
  let vGastoFijo=cuentaLocal.gastoFijo;
  let vGastoVar=cuentaLocal.gastoVariable;
  let total=0;
  total=vIngreso-vGastoFijo-vGastoVar;
  return total;
}
function init() {
  mostrarNombreCuenta();
  pintaPastel();
}

function mostrarNombreCuenta() {
  let slot= document.getElementById("selectSlot").value;
  let cuenta = JSON.parse(localStorage.getItem(slot));
  let tituloCuenta_DOM=document.getElementById("tituloCuenta");
  let nombreCuenta="";
  if (cuenta === null) {
    nombreCuenta="cuenta no registrada";
  }else{
    nombreCuenta=cuenta.nombreCuenta;
  }
  tituloCuenta_DOM.innerHTML="";
  tituloCuenta_DOM.innerHTML=nombreCuenta;
}

function mostrarVentanaTrans() {
  let ventana = document.getElementById("contenedorTransaccion");
  ventana.classList.remove("ocultar");
  ventana.classList.add("contenedorTransaccion");
}
function ocultarVentanaTrans() {
  let ventana = document.getElementById("contenedorTransaccion");
  ventana.classList.remove("contenedorTransaccion");
  ventana.classList.add("ocultar");
  
}

//Funcion hacer transaccion 

  function addTransaccion(transaccion) {
    let slot= document.getElementById("selectSlot").value;
    const cuentaLocal = JSON.parse(localStorage.getItem(slot));
    console.log(cuentaLocal);
    if (cuentaLocal === null) {
      nombreCuenta="cuenta no registrada";
    }else{
      if (transaccion.tipo=='Ingreso') {
        cuentaLocal.ingreso=cuentaLocal.ingreso+(+transaccion.cantidad);
      }else if (transaccion.tipo=='Gastos Fijos') {
        cuentaLocal.gastoFijo=cuentaLocal.gastoFijo+(+transaccion.cantidad);
      } else {
        cuentaLocal.gastoVariable=cuentaLocal.gastoVariable+(+transaccion.cantidad);
      }
      cuentaLocal.listaTrans.push(transaccion);
      localStorage.setItem(slot, JSON.stringify(cuentaLocal));
      pintaPastel(cuentaLocal.listaTrans);
      ocultarVentanaTrans();
      document.location.reload(true);
    }
  }


//---------------------------
//OBJETO ERRORES
//---------------------------

let errores_DOM=document.getElementById("errores");
const errores={
  nombre:"",
  cantidad:0,
  fecha:""
};
function imprimeErrores() {
  let text = '';
  Object.keys(errores).forEach((key)=>{
      if(errores[key]){
          text += `<p> ${key}: ${errores[key]}</p>`;
      }
  });
  errores_DOM.innerHTML="";
  errores_DOM.innerHTML=text;     
}


let errores1_DOM=document.getElementById("errores1");
const errores1={
  nombre:"",
};

function imprimeErroresCuenta() {
  let text = '';
  Object.keys(errores1).forEach((key)=>{
      if(errores1[key]){
          text += `<p> ${key}: ${errores1[key]}</p>`;
      }
  });
  errores1_DOM.innerHTML="";
  errores1_DOM.innerHTML=text;     
}


//---------------------------
//VALIDACIONES DEL FORMULARIO
//---------------------------

function validarNombreTrans() {
    let valido=true;
    if (document.getElementById("nombreTrans").value==""||!(isNaN(document.getElementById("nombreTrans").value))) {
      errores.nombre=" formato incompatible";
      valido=false;
    }else{
      errores.nombre="";
    }
    imprimeErrores();
    return valido;
}
function validarCantidadTrans() {
  let valido=true;
  if (document.getElementById("cantidadTrans").value==0||(isNaN(document.getElementById("cantidadTrans").value))||(document.getElementById("cantidadTrans").value<=0)) {
    errores.cantidad=" formato incompatible";
    valido=false;
  }else{
    errores.cantidad="";
  }
  imprimeErrores();
  return valido;
}
function validarFechaTrans() {
  let valido=true;
  if (document.getElementById("fechaTrans").value=="") {
    errores.fecha=" Incompleto";
    valido=false;
  }else{
    errores.fecha="";
  }
  imprimeErrores();
  return valido;
}

function addCuenta(cuenta) {
  localStorage.setItem(cuenta.slot, JSON.stringify(cuenta));
  ocultarVentanaCuenta();
  document.location.reload(true);
}

function mostrarVentanaCuenta() {
  let ventana = document.getElementById("contenedorCreadorCuenta");
  ventana.classList.remove("ocultar");
  ventana.classList.add("contenedorCreadorCuenta");
}
function ocultarVentanaCuenta() {
  let ventana = document.getElementById("contenedorCreadorCuenta");
  ventana.classList.remove("contenedorCreadorCuenta");
  ventana.classList.add("ocultar");
  
}
function validarNombreCuenta() {
  let valido=true;
  if (document.getElementById("nombreCuenta").value==""||!(isNaN(document.getElementById("nombreCuenta").value))) {
    errores1.nombre=" formato incompatible";
    valido=false;
  }else{
    errores1.nombre="";
  }
  imprimeErroresCuenta();
  return valido;
}
function iniciarlizarDatos() {
  mostrarVentanaCuenta();
};