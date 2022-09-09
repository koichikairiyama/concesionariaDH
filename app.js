const autos  = require('./autos')
const persona = require('./persona')

let concesionaria = {
   
autos: autos,

  
    buscarAuto: function(patente){ 
       let unAuto = autos.find(function(autos){
          return autos.patente == patente
       }) 
       if (unAuto == undefined) {
          return null
       } else { return unAuto }
    },

    

    venderAuto: function (patente) {
     let auto = this.buscarAuto(patente) 
     auto.vendido = true;
    return auto
     
    },

    autosParaLaVenta : function() {
        let result = autos.filter(function(autos) {
        return autos.vendido != true }) 
        return result 
    }, 

    autosNuevos : function() {
        let autosQuePuedoVender = this.autosParaLaVenta();
        let autoNuevo = autosQuePuedoVender.filter(function(autos){
        return autos.km < 100 }) 
        return autoNuevo
    },  

    listaDeVentas : function() {
    let autosVendidos = autos.filter(function(auto) {
        return auto.vendido == true
    })
    let preciosVendidos = autosVendidos.map(function(autos) {
        return autos.precio 
    }) 
    return preciosVendidos  
    } , 

    totalDeVentas : function() {
        let total = this.listaDeVentas() 
        let sumatoria = total.reduce(function(acum, precio) {
            return acum + precio
        }, 0)
        return sumatoria
    }, 

    puedeComprar: function(auto, persona) {
        let puedePagarTotal = Number(auto.precio) <= Number(persona.capacidadDePagoTotal)
        let puedePagarCuotas = Number(persona.capacidadDePagoEnCuotas) >= Number(auto.precio/auto.cuotas) 
        //console.log(puedePagarCuotas)
        //console.log(puedePagarTotal)
        return puedePagarTotal && puedePagarCuotas 
       
    }, 


    autosQuePuedeComprar : function(persona) {
        let autosVendibles = this.autosParaLaVenta()
        let comprable = autosVendibles.filter(function(auto) {
            return concesionaria.puedeComprar(auto,persona)
        }) 
        return comprable 
    }
   
}



//console.log(concesionaria.buscarAuto('APL123')) 
//concesionaria.venderAuto('JJK116')
//concesionaria.venderAuto('APL123')
//console.log(concesionaria.autosParaLaVenta())
//console.log(concesionaria.autosNuevos())
//console.log(concesionaria.listaDeVentas())
//console.log(concesionaria.totalDeVentas())
//console.log(concesionaria.puedeComprar(autos[1], persona[1]))
console.log(concesionaria.autosQuePuedeComprar(persona[0]))


