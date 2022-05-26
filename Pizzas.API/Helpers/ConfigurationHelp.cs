using System.Data.SqlClient;
using System.IO;
using Microsoft.Extensions.Configuration;


namespace Pizzas.API.Helpers{

    public class ConfigurationHelper{

        public static IConfiguration GetConfiguration(){
            Iconfiguration config;
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJson("appsettings.json",optional : true , reloadOnCharge:true);
                config=builder.Build();
                return config;
            }
        }
    }