//Javier de la Rubia Sánchez

window.addEventListener('DOMContentLoaded',(event) =>{
  document.getElementById("guardar").addEventListener("submit",()=>{addTransaccion({
                                                                                    
                                                                                    tipo : document.getElementById("tipoTrans").value,
                                                                                    categoria : document.getElementById('categoriaTrans').value,
                                                                                    cantidad : document.getElementById('cantidadTrans').value,
                                                                                    nombre : document.getElementById('nombreTrans').value,
                                                                                    fecha : document.getElementById('fechaTrans').value,
                                                                                    color : document.getElementById('colorTrans').value 
                                                                                    })})
  document.getElementById("addTrans").addEventListener("click",()=>{mostrarVentanaTrans()})
  document.getElementById("crearCuenta").addEventListener("click",()=>{iniciarlizarDatos()})
 });

//Objeto cuenta corriente
  let cuenta_DOM;
  function iniciarlizarDatos() {
      localStorage.setItem('cuenta',JSON.stringify(cuenta));
  };
 const cuenta={
      ingreso : 0,
      gastoFijo : 0,
      gastoVariable : 0,
      listaTrans : [],
      nombreCuenta :"CuentaPrueba"
  };

//Obtener lista de transacciones con el parametro concreto
  function getListaParametro(listaTrans,parametro) {
    let lista=[];
    listaTrans.forEach(trans => {
      lista.push(trans[parametro]);
    });
      return lista;
  }

//Pinta Grafica Pastel
  function pintaPastel(listaTrans) {
    const cuenta= JSON.parse(localStorage.getItem('cuenta'));
    document.getElementById("chart-wrapper").innerHTML="";
    document.getElementById("chart-wrapper").innerHTML='<canvas id="myChart"></canvas>';
    let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: getListaParametro(cuenta.listaTrans,'cantidad'),
          backgroundColor: getListaParametro(cuenta.listaTrans,'color')
        }],
        labels: getListaParametro(cuenta.listaTrans,'tipo')
        
      },
      options: {
        elements: {
          
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'bottom',
          display: false
        
        },
        plugins: {
          datalabels: {
          },
          title: {
            display: true,
            text: 'Chart Title',
            
          }
        }
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
        let text = cuenta.ingreso-cuenta.gastoFijo-cuenta.gastoVariable ,
            textX = Math.round((width - ctx.measureText(text).width) / 2),
            textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      }
    });
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
    fecha : Date,
    color : ""
   
}

pintaPastel(cuenta.listaTrans);

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
      cuentaLocal = JSON.parse(localStorage.getItem('cuenta'));
      console.log("Putita"+cuentaLocal);
      if (transaccion.tipo=='Ingreso') {
        cuentaLocal.ingreso=+transaccion.cantidad;
      }else if (transaccion.tipo=='Gastos Fijos') {
        cuentaLocal.gastoFijo=+transaccion.cantidad;
      } else {
        cuentaLocal.gastoVariable=+transaccion.cantidad;
      }
      cuentaLocal.listaTrans.push(transaccion);

    localStorage.setItem('cuenta', JSON.stringify(cuentaLocal));
    pintaPastel(cuentaLocal.listaTrans);
    ocultarVentanaTrans();
  }