//Javier de la Rubia Sánchez
let labels = ['Ingresos','GastosFijos','GastosVariables'];
let colorHex = ['#A5DC75','#DCAA75','#BD75DC'];
let cuenta_DOM;

const cuenta={
    ingreso:10,
    gastoFijo:10,
    gastoVariable:10
};
class TipoTrans {
  static Ingreso = new tipoTrans("Ingreso")
  static GastosFijos = new tipoTrans("Gastos Fijos")
  static GastosVariables = new tipoTrans("Gastos Variables")

  constructor(nombre) {
    this.nombre = nombre
  }
}
class Categoria {
  static Comida = new tipoTrans("Comida")
  static Viaje = new tipoTrans("Viaje")
  static Entretenimiento = new tipoTrans("Entretenimiento")

  constructor(nombre) {
    this.nombre = nombre
  }
}
class transaccion {
    static tipo = TipoTrans;
    static categoria = Categoria;
    static cantidad = 0;
    static nombre = "";
    static fecha = Date;
}


pintaPastel(cuenta.ingreso,cuenta.gastoFijo,cuenta.gastoVariable);

function addIngreso() {
    let cantidad = +document.getElementById("ingreso").value;
    console.log(cantidad);
    cuenta.ingreso= cuenta.ingreso+cantidad;
    console.log(cuenta.ingreso);
    pintaPastel(cuenta.ingreso,cuenta.gastoFijo,cuenta.gastoVariable);
}

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
