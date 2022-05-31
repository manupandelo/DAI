import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const PersonaTabla = process.env.DB_TABLA_PERSONA;
const MovieTabla = process.env.DB_TABLA_MOVIE;
const IntermediaTabla = process.env.DB_TABLA_INTERMEDIA;

export class MovieService {

    getMovie = async (titulo, order) => {
        console.log('This is a function on the service');
        let response;
        const pool = await sql.connect(config);
        response = await pool.request().query(`SELECT * from ${PersonaTabla}`);
        console.log(response)
        return response.recordset;
    }

    getMovieById = async (id) => {
        console.log('This is a function on the service');
        let persona;
        let movie

        const pool = await sql.connect(config);
        movie = await pool.request()
            .input('id', sql.Int, id)
            .query(`Select * FROM ${MovieTabla} where id = @id`);
        console.log(personaje)

        persona = await pool.request()
            .input('id', sql.Int, id)
            .query(`select  titulo from ${PersonaTabla} inner join ${IntermediaTabla} on ${PersonaTabla}.id = ${IntermediaTabla}.idPersona inner join ${MovieTabla} on ${IntermediaTabla}.idMovie = ${MovieTabla}.id`);
        console.log(serie)

        movie.recordset[0].PersonajesAsociados = persona.recordset;
        console.log(movie);
        return movie.recordset;
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