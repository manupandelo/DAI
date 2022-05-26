import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const MovieTabla = process.env.DB_TABLA_MOVIE;

export class MovieService {

    getMovie = async (titulo, order) => {
        console.log('This is a function on the service');
        let response;
        const pool = await sql.connect(config);
        if(!titulo){
            if(order=="asc" || order=="desc"){
                 response = await pool.request().input('order',sql.Varchar, order).query(`SELECT * from ${MovieTabla} order by @order`);
                 
            }else{
                response = await pool.request().query(`SELECT * from ${PersonaTabla}`);
            }
        }
        else{
            if(order=="asc" || order=="desc"){
                response = await pool.request()
                .input('titulo',sql.VarChar, titulo)
                .query(`SELECT * from ${MovieTabla} where titulo= @titulo order by @order`);
            }
            else{
                response = await pool.request()
                .input('nombre',sql.VarChar, nombre)
                .query(`SELECT * from ${MovieTabla} where titulo= @titulo`);
            }
        }
        console.log(response)
        return response.recordset;
    }

    getMovieById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${MovieTabla} where id = @id`
            );
        console.log(response)

        return response.recordset[0];
    }

    createMovie = async (Movie) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('nombre',sql.VarChar, Movie?.titulo ?? '')
            .input('imagen',sql.VarChar, Movie?.imagen ?? '')
            .input('fechacreacion',sql.Date, Movie?.fechacreacion ?? 0)
            .query(`INSERT INTO ${MovieTabla}(nombre, imagen, fechacreacion, calificacion) VALUES (@nombre, @imagen, @fechacreacion, 0)`);
        console.log(response)

        return response.recordset;
    }

    updateMovieById = async (id, Movie) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .input('Nombre',sql.VarChar, Movie?.nombre ?? '')
            .input('Imagen',sql.VarChar, Movie?.imagen ?? '')
            .input('Calificacion' ,sql.Int, Movie?.calificacion)
            .query(`UPDATE ${MovieTabla} SET titulo = @Nombre, imagen = @Imagen, calificacion = @Calificacion  WHERE id = @Id`);
        console.log(response)

        return response.recordset;
    }

    deleteMovieById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${MovieTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }
}