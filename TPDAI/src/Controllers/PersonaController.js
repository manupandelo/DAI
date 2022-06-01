import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { PersonaService } from '../Services/PersonaService.js';

const router = Router();
const personaService = new PersonaService();

router.get('', Authenticate ,async (req, res) => {
  console.log(`This is a get operation. Nombre: ${req.params.id}, Edad:${req.params.edad}, Peso:${req.params.peso}, idpeli: ${req.params.idMovie} `);
  const Personas = await personaService.getPersona(req.params.nombre, req.params.edad ,req.params.peso, req.params.idMovie);
  return res.status(200).json(Personas);
});

router.get('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const Persona = await personaService.getPersonaById(req.params.id);

  return res.status(200).json(Persona);
});

router.post('', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);

  const Persona = await personaService.createPersona(req.body);

  return res.status(201).json(Persona);
});

router.put('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const Persona = await personaService.updatePersonaById(req.params.id, req.body);

  return res.status(200).json(Persona);
});

router.delete('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const Persona = await personaService.deletePersonaById(req.params.id);

  return res.status(200).json(Persona);
});

export default router;
