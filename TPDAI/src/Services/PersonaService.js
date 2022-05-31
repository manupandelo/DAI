import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const PersonaTabla = process.env.DB_TABLA_PERSONA;
const MovieTabla = process.env.DB_TABLA_MOVIE;
const IntermediaTabla = process.env.DB_TABLA_INTERMEDIA;

export class PersonaService {

    getPersona = async (nombre, edad, peso, idMovie) => {
        console.log('This is a function on the service');
        let response;
        const pool = await sql.connect(config);
        if(!nombre){
            if(!edad){
                 response = await pool.request().query(`SELECT * from ${PersonaTabla}`);
                 
            }else{
                response = await pool.request()
                .input('edad',sql.Int, edad)
                .query(`SELECT * from ${PersonaTabla} where edad = @edad`);
            }
        }
        else{
            if(!edad){
                response = await pool.request()
                .input('nombre',sql.VarChar, nombre)
                .query(`SELECT * from ${PersonaTabla} where nombre= @nombre`);
            }
            else{
                response = await pool.request()
                .input('nombre',sql.VarChar, nombre)
                .input('nombre',sql.VarChar, nombre)
                .query(`SELECT * from ${PersonaTabla} where nombre= @nombre && edad = @edad`);
            }
        }
        console.log(response)
        return response.recordset;
    }

    getPersonaById = async (id) => {
        console.log('This is a function on the service');
        let persona;
        let movie

        const pool = await sql.connect(config);
        persona = await pool.request()
            .input('id', sql.Int, id)
            .query(`Select * FROM ${PersonaTabla} where id = @id`);
        console.log(personaje)

        movie = await pool.request()
            .input('id', sql.Int, id)
            .query(`select  titulo from ${MovieTabla} inner join ${IntermediaTabla} on ${MovieTabla}.id = ${IntermediaTabla}.idMovie inner join ${PersonaTabla} on ${PersonaTabla}.id = ${IntermediaTabla}.idPersona AND ${PersonaTabla}.id = @id`);
        console.log(serie)

        personaje.recordset[0].seriesAsociadas = serie.recordset;

        return personaje.recordset;
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