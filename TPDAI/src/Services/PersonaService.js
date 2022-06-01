import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const PersonaTabla = process.env.DB_TABLA_PERSONA;
const MovieTabla = process.env.DB_TABLA_MOVIE;
const IntermediaTabla = process.env.DB_TABLA_INTERMEDIA;

export class PersonaService {

    getPersona = async (nombre, edad, peso, idMovie) => {
        console.log('This is a function on the service');
        let query=`SELECT * from ${PersonaTabla} `;
        if(nombre ){
            query+=` and nombre=@Nombre`;              
        }else if(edad){
            query+=` and edad=@Edad`;
        }else if(idMovie){
            query+=` and ${IntermediaTabla}.idPelicula=@IdPelicula`; 
        }else if(peso){
            query+=` and peso=@Peso `;
        }else{
            query=`SELECT * from ${PersonaTabla}`;
        }
        const pool = await sql.connect(config);
        const response = await pool.request()
        .input('Nombre', sql.VarChar, nombre)
        .input('Edad', sql.Int, edad)
        .input('IdPelicula', sql.Int, idMovie)
        .input('Peso', sql.Int, peso)
        .query(query);
        console.log(response)
        return response.recordset;
    }

    getPersonaById = async (id) => {
        console.log('This is a function on the service');
        let persona;
        let movie;

        const pool = await sql.connect(config);
        persona = await pool.request()
            .input('id', sql.Int, id)
            .query(`Select * FROM ${PersonaTabla} where id = @id`);
        console.log(persona);

        console.log('entering second function');
        movie = await pool.request()
            .input('id', sql.Int, id)
            .query(`select ${MovieTabla}.titulo from ${PersonaTabla} inner join ${IntermediaTabla} on ${PersonaTabla}.id = ${IntermediaTabla}.idPersona inner join ${MovieTabla} on  ${IntermediaTabla}.idMovie = ${MovieTabla}.id where ${PersonaTabla}.id = @id`);
        console.log(movie)

        persona.recordset[0].seriesAsociadas = movie.recordset;

        return persona.recordset;
    }

    createPersona = async (Persona) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('nombre',sql.VarChar, Persona?.nombre ?? '')
            .input('imagen',sql.VarChar, Persona?.imagen ?? '')
            .input('edad',sql.Int, Persona?.edad ?? 0)
            .input('peso',sql.Int, Persona?.peso ?? 0)
            .input('historia',sql.VarChar, Persona?.historia ?? '')
            .query(`INSERT INTO ${PersonaTabla}(nombre, imagen, edad, peso, historia) VALUES (@nombre, @imagen, @edad, @peso, @historia)`);
        console.log(response)

        return response.recordset;
    }

    updatePersonaById = async (id, Persona) => {
        console.log('This is a function on the service');
        console.log(id, Persona)
        

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id', sql.Int, id ?? '')
            .input('Imagen', sql.VarChar, Persona?.imagen ?? '')
            .input('Nombre', sql.VarChar, Persona?.nombre ?? '')
            .input('Edad', sql.VarChar, Persona?.edad ?? '')
            .input('Peso', sql.VarChar, Persona?.peso ?? '')
            .input('Historia', sql.VarChar, Persona?.historia ?? '')
            .query(`UPDATE ${PersonaTabla} SET imagen = @Imagen, nombre = @Nombre, edad = @Edad, peso = @Peso, historia = @Historia WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }

    deletePersonaById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${PersonaTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }
}