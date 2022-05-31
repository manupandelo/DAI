import { Router } from 'express';
import { Authenticate } from '../common/jwt.strategy.js';
import { PersonaService } from '../Services/PersonaService.js';

const router = Router();
const personaService = new PersonaService();

router.get('/all', Authenticate, async (req, res) => {
  console.log(`This is a get operation`);
  const Personas = await personaService.getPersona(req.query.nombre, req.query.edad ,req.query.peso, req.query.idMovie);
  return res.status(200).json(Personas);
});

router.get('/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a get operation`);

  const Persona = await personaService.getPersonaById(req.params.id);

  return res.status(200).json(Persona);
});

router.post('/create', Authenticate, async (req, res) => {
  console.log(`This is a post operation`);

  const Persona = await personaService.createPersona(req.body);

  return res.status(201).json(Persona);
});

router.put('/update/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a put operation`);

  const Persona = await personaService.updatePersonaById(req.params.id, req.body);

  return res.status(200).json(Persona);
});

router.delete('/delete/:id', Authenticate, async (req, res) => {
  console.log(`Request URL Param: ${req.params.id}`);
  console.log(`This is a delete operation`);

  const Persona = await personaService.deletePersonaById(req.params.id);

  return res.status(200).json(Persona);
});

export default router;
