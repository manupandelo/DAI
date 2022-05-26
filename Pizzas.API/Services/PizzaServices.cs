using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Pizzas.API.Models;
using Pizzas.API.Utils;
using System.Data.SqlClient;
using Dapper;
using Pizzas.API.Controllers;

namespace Pizzas.API.Services
{
    public class PizzaServices{
        public static List<Pizza> GetAll(){
            List<Pizza> ListaPizzas;
            string sp= "GetAll";
            using(SqlConnection db = new SqlConnection(BD.GetConnection)){
                ListaPizzas = db.Query<Pizza>(sp,commandType: commandType.StoredProcedures).ToList();
            }
            return ListaPizzas;
        }

        public static Pizza Select(int id){
            Pizza MiPizza = null;
            string sql = "SELECT * from Pizzas WHERE Id = @Iid";
            using(SqlConnection db = new SqlConnection(BD.GetConnection)){
                MiPizza = db.QueryFirstOrDefault<Pizza>(sql, new{ Iid = id});
            }
            return MiPizza;
        }

        public static int Insert(Pizza MiPizza){
            string sql = "insert Pizzas(Nombre,LibreGluten,Importe,Descripcion) VALUES(@NNombre, @LlibreGluten, @Iimporte,@Ddescripcion)";
            int inserts=0;
            using(SqlConnection db = new SqlConnection(BD.GetConnection)){
                inserts = db.Execute(sql, new{ NNombre=MiPizza.Nombre,LLibreGluten=MiPizza.LibreGluten,Iimporte=MiPizza.Importe,Ddescripcion=MiPizza.Descripcion});
            }
            return inserts;
        }

        public static int Update(Pizza MiPizza){
            
            string sql = "UPDATE Pizzas SET Nombre=@vNombre, LibreGluten=@vLibreGluten, Importe=@vImporte, Descripcion=@vDescripcion WHERE Id=@vId";
            int Updates=0;
            using(SqlConnection db = new SqlConnection(BD.GetConnection)){
                Updates = db.Execute(sql, new{vId = MiPizza.Id, vNombre=MiPizza.Nombre,vLibreGluten=MiPizza.LibreGluten,vImporte=MiPizza.Importe,vDescripcion=MiPizza.Descripcion});
            }
            return Updates;

        }

        public static void Delete(int Id){
            string sql="Delete From Pizzas where id=@iid";
            using (SqlConnection DB= new SqlConnection(BD.GetConnection)){
                DB.Execute(sql, new {iid=Id});
            }
        }
    }
}