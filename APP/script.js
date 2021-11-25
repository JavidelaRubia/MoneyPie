//Javier de la Rubia Sánchez
let ctx = document.getElementById("myChart").getContext("2d");
let labels = ['Ingresos','GastosFijos','GastosVariables'];
let colorHex = ['#A5DC75','#DCAA75','#BD75DC'];
let cuenta_DOM;
const cuenta={
    ingreso:10,
    gastoFijo:10,
    gastoVariable:10
};


function addIngreso() {
    let cantidad = +document.getElementById("ingreso").value;
    console.log(cantidad);
    cuenta.ingreso= cuenta.ingreso+cantidad;
    console.log(cuenta.ingreso);
}


var options = {
    series: [44, 55, 41, 17, 15],
    chart: {
    width: 380,
    type: 'donut',
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 270
    }
  },
  dataLabels: {
    enabled: false
  },
  fill: {
    type: 'gradient',
  },
  legend: {
    formatter: function(val, opts) {
      return val + " - " + opts.w.globals.series[opts.seriesIndex]
    }
  },
  title: {
    text: 'Gradient Donut with custom Start-angle'
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }]
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();