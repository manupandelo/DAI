using System.Data.SqlClient;
using Dapper;
using System;
using Pizzas.API.Helpers;
using Pizzas.API.Services;

namespace Pizzas.API.Utils
{
    public class BD {
        public static SqlConnection GetConnection(){
            SqlConnection db;
            string connectionString;

            connectionString = ConfigurationHelper.GetConfiguration().GetValue<string>("DatabaseSettings: ConnectionString");
            db= new SqlConnection(connectionString);
            return db;
        }

    }
}