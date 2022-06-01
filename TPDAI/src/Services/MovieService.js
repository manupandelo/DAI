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
        if(!titulo){
            if(order=="DESC"){
                response = await pool.request()
                .query(`SELECT * from ${MovieTabla} ORDER BY ${PeliculaTabla}.fechacreacion DESC`)
            }
            else if(order=="ASC"){
                response = await pool.request()
                .query(`SELECT * from ${MovieTabla} ORDER BY ${PeliculaTabla}.fechacreacion ASC`)
            }
            else{
                response = await pool.request()
                .query(`SELECT * from ${MovieTabla}`); 
            }
        }
        else{
            if(order=="ASC"){
                response = await pool.request()
                .input('Titulo', sql.VarChar, titulo)
                .query(`SELECT * from ${MovieTabla} WHERE titulo LIKE %@Titulo% ORDER by Pelicula.fechacreacion ASC`);
            }
            else if(order=="DESC"){
                response = await pool.request()
                .input('Titulo', sql.VarChar, titulo)
                .query(`SELECT * from ${MovieTabla} WHERE titulo LIKE %@Titulo% ORDER by Pelicula.fechacreacion DESC`);
            }
            else{
                response = await pool.request()
                .input('Titulo', sql.VarChar, titulo)
                .query(`SELECT * from ${MovieTabla} WHERE titulo=@Titulo`);
            }
        }
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
        console.log(movie)

        persona = await pool.request()
            .input('id', sql.Int, id)
            .query(`select ${PersonaTabla}.nombre from ${MovieTabla} inner join ${IntermediaTabla} on ${MovieTabla}.id = ${IntermediaTabla}.idMovie inner join ${PersonaTabla} on  ${IntermediaTabla}.idPersona = ${PersonaTabla}.id where ${MovieTabla}.id = @id`);
        console.log(persona)

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
            .query(`INSERT INTO ${MovieTabla}(titulo, imagen, fechacreacion, calificacion) VALUES (@nombre, @imagen, @fechacreacion, 0)`);
        console.log(response)

        return response.recordset;
    }

    updateMovieById = async (id, Movie) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .input('Nombre',sql.VarChar, Movie?.titulo ?? '')
            .input('Imagen',sql.VarChar, Movie?.imagen ?? '')
            .input('Calificacion' ,sql.Int, Movie?.calificacion ?? '')
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