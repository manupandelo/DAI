using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Pizzas.API.Models;
using Pizzas.API.Services;

namespace Pizzas.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PizzaController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            List<Pizza> ListaPizzas;
            ListaPizzas=PizzaServices.GetAll();
            return Ok(ListaPizzas);
        }

        [HttpGet ("{Id}")]
        public IActionResult SelectById(int Id)
        {
            if(Id<=0){
                return BadRequest();
            }else{
                Pizza MiPizza;
                MiPizza=PizzaServices.Select(Id);
                if(MiPizza==null){
                    return NotFound();
                }else{
                    return Ok(MiPizza);
                }
            }
        }

       [HttpPost]
        public IActionResult Create (Pizza unaPizza){
            int Insertado;
            Insertado=PizzaServices.Insert(unaPizza);
            if(Insertado==0){
                return BadRequest();
            }
            else{
                return Ok(unaPizza);
            }
            
        }

         [HttpPut("{id}")]
        public IActionResult Update(int id, Pizza unaPizza){
            int cambiado;
            if(id!=unaPizza.Id){
                return BadRequest();
            }
            Pizza PizzaExistente=PizzaServices.Select(id);
            if(PizzaExistente==null){
                return NotFound();
            }


            cambiado=PizzaServices.Update(unaPizza);
            if(cambiado==0){
                return BadRequest();
            }
            else{
                return Ok();
            }
        }

        [HttpDelete ("{id}")]
        public IActionResult Delete(int id)
        {
            Pizza PizzaExistente=PizzaServices.Select(id);
            if(PizzaExistente==null){
                return NotFound();
            }
            PizzaServices.Delete(id);
            return Ok();
        }
    }
}

 
       

        