const autosImportados = require("./autos");

const concesionaria = {
   autos: autosImportados,
   buscarAuto: function(patente){
      return this.autos.find(auto=> auto.patente===patente)||null;
   },
   autosParaLaVenta: function(){
      return this.autos.filter(auto=> !auto.vendido);
   },
   venderAuto: function(patente){
      const autoEncontrado = this.buscarAuto(patente);
    
    if (autoEncontrado) {
      autoEncontrado.vendido = true;
      }
   },
   autosNuevos: function (){
      return this.autosParaLaVenta().filter(auto => auto.km < 100);
   },
   listaDeVentas: function(){
      const autosVendidos = this.autos.filter(auto => auto.vendido);
      return autosVendidos.map(auto => auto.precio);
   },
   totalDeVentas: function(){
      const preciosVentas = this.listaDeVentas();
      const total = preciosVentas.reduce((acumulador, precio) => acumulador + precio, 0);
      
      return total;
   },
   puedeComprar: function(auto,persona){
      const costoCuota = auto.precio / auto.cuotas;
      return auto.precio <= persona.capacidadDePagoTotal && costoCuota <= persona.capacidadDePagoEnCuotas;
   },
   autosQuePuedeComprar: function(persona){
      const autosDisponibles = this.autosParaLaVenta();
      return autosDisponibles.filter(auto=> this.puedeComprar(auto,persona));
   }
};
const persona = {
   nombre: 'Juan',
   capacidadDePagoEnCuotas: 20000,
   capacidadDePagoTotal: 100000
};
console.log(concesionaria.autosQuePuedeComprar(persona));