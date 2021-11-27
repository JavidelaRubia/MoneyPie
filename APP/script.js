//Javier de la Rubia Sánchez

window.addEventListener('DOMContentLoaded',(event) =>{
  document.getElementById("guardar").addEventListener("click",()=>{addTransaccion()})
}



















let labels = ['Ingresos','GastosFijos','GastosVariables'];
let colorHex = ['#A5DC75','#DCAA75','#BD75DC'];
let cuenta_DOM;

const cuenta={
    ingreso:10,
    gastoFijo:10,
    gastoVariable:10
};
class TipoTrans {
  static Ingreso = new TipoTrans("Ingreso");
  static GastosFijos = new TipoTrans("Gastos Fijos");
  static GastosVariables = new TipoTrans("Gastos Variables");

  constructor(nombre) {
    this.nombre = nombre;
  }
}
class Categoria {
  static Comida = new Categoria("Comida");
  static Viaje = new Categoria("Viaje");
  static Entretenimiento = new Categoria("Entretenimiento");

  constructor(nombre) {
    this.nombre = nombre;
  }
}
class Transaccion {
    static tipo = TipoTrans;
    static categoria = Categoria;
    static cantidad = 0;
    static nombre = "";
    static fecha = Date;
    static color = "";

    constructor(tipo,categoria,color,cuenta,fecha,nombre,cantidad) {
      this.tipo=tipo;
      this.categoria=categoria;
      this.color=color;
      this.cantidad=cantidad;
      this.fecha=fecha;
      this.cuenta=cuenta;
      this.nombre = nombre;
    }
    
}


pintaPastel(cuenta.ingreso,cuenta.gastoFijo,cuenta.gastoVariable);

// function addIngreso() {
//     let cantidad = +document.getElementById("ingreso").value;
//     console.log(cantidad);
//     cuenta.ingreso= cuenta.ingreso+cantidad;
//     console.log(cuenta.ingreso);
//     pintaPastel(cuenta.ingreso,cuenta.gastoFijo,cuenta.gastoVariable);
// }

function pintaPastel(ingreso,gastoFijo,gastoVariable) {
  document.getElementById("chart-wrapper").innerHTML="";
  document.getElementById("chart-wrapper").innerHTML="´<canvas id='myChart'></canvas>´";
  let ctx = document.getElementById("myChart").getContext("2d");
  let myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [ingreso,gastoFijo,gastoVariable],
        backgroundColor: colorHex
      }],
      labels: labels
      
    },
    options: {
      responsive: true,
      legend: {
        position: 'bottom',
      
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
}

//Funcion hacer transaccion

function addTransaccion() {
  let categoria = document.getElementById('categoriaTrans').value;
  let color = document.getElementById('colorTrans').value;
  let cuenta = document.getElementById('cuentaTrans').value;
  let fecha = document.getElementById('fechaTrans').value;
  let nombre = document.getElementById('nombreTrans').value;
  let cantidad = document.getElementById('cantidadTrans').value;
  
  const transaccion = new Transaccion(tipo,categoria,color,cuenta,fecha,nombre,cantidad);
}
