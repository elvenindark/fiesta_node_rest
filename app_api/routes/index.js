var express = require('express');
var router = express.Router();

var ctrlReviews = require('../controllers/reviews');
var ctrlLocales = require('../controllers/locales');
var ctrlConsortes = require('../controllers/consortes');
var ctrlBebidas = require('../controllers/bebidas');
var ctrlHorarios = require('../controllers/horarios');
var ctrlClientes = require('../controllers/clientes');
var ctrlComentarios = require('../controllers/comentarios');
var ctrlUbicaciones = require('../controllers/ubicaciones');


//locales
router.get('/locales', ctrlLocales.localesList);
router.get('/locales/:localid', ctrlLocales.localesReadOne);
router.post('/locales', ctrlLocales.localesCreate);
router.put('/locales/:localid', ctrlLocales.localesUpdateOne);
router.delete('/locales/:localid', ctrlLocales.localesDeleteOne);
router.get('/locales/:localid/consortes', ctrlLocales.localesConsortesList);
router.post('/locales/:localid/consortes', ctrlLocales.localesConsortesCreate);
router.delete('/locales/:localid/consortes/:consorteid', ctrlLocales.localesConsortesDeleteOne);

//consortes
router.get('/consortes', ctrlConsortes.consortesList);
router.get('/consortes/:consorteid', ctrlConsortes.consortesReadOne);
router.post('/consortes', ctrlConsortes.consortesCreate);
router.put('/consortes/:consorteid', ctrlConsortes.consortesUpdateOne);
router.delete('/consortes/:consorteid', ctrlConsortes.consortesDeleteOne);
router.get('/consortes/:consorteid/locales', ctrlConsortes.consortesLocalesList);
router.post('/consortes/:consorteid/locales', ctrlConsortes.consortesLocalesCreate);
router.delete('/consortes/:consorteid/locales/:localid', ctrlConsortes.consortesLocalesDeleteOne);

//bebidas
router.get('/bebidas', ctrlBebidas.bebidasList);
router.get('/bebidas/:bebidaid', ctrlBebidas.bebidasReadOne);
router.post('/bebidas', ctrlBebidas.bebidasCreate);
router.put('/bebidas/:bebidaid', ctrlBebidas.bebidasUpdateOne);
router.delete('/bebidas/:bebidaid', ctrlBebidas.bebidasDeleteOne);

//clientes
router.get('/clientes', ctrlClientes.clientesList);
router.get('/clientes/:clienteid', ctrlClientes.clientesReadOne);
router.post('/clientes', ctrlClientes.clientesCreate);
router.put('/clientes/:clienteid', ctrlClientes.clientesUpdateOne);
router.delete('/clientes/:clienteid', ctrlClientes.clientesDeleteOne);
router.get('/clientes/:clienteid/comentarios', ctrlClientes.clientesComentariosList);
router.post('/clientes/:clienteid/comentarios', ctrlClientes.clientesComentariosCreate);
router.delete('/clientes/:clienteid/comentarios/:comentarioid', ctrlClientes.clientesComentariosDeleteOne);


//comentarios
router.get('/comentarios', ctrlComentarios.comentariosList);
router.get('/comentarios/:ccomentarioid', ctrlComentarios.comentariosReadOne);
router.post('/comentarios', ctrlComentarios.comentariosCreate);
router.put('/comentarios/:comentarioid', ctrlComentarios.comentariosUpdateOne);
router.delete('/comentarios/:comentarioid', ctrlComentarios.comentariosDeleteOne);

//horarios
router.get('/horarios', ctrlHorarios.horariosList);
router.get('/horarios/:horarioid', ctrlHorarios.horariosReadOne);
router.post('/horarios', ctrlHorarios.horariosCreate);
router.put('/horarios/:horarioid', ctrlHorarios.horariosUpdateOne);
router.delete('/horarios/:horarioid', ctrlHorarios.horariosDeleteOne);

//ubicaciones
router.get('/ubicaciones', ctrlUbicaciones.ubicacionesList);
router.get('/ubicaciones/:ubicacionid',ctrlUbicaciones.ubicacionesReadOne);
router.post('/ubicaciones', ctrlUbicaciones.ubicacionesCreate);
router.put('/ubicaciones/:ubicacionid', ctrlUbicaciones.ubicacionesUpdateOne);
router.delete('/ubicaciones/:ubicacionid', ctrlUbicaciones.ubicacionesDeleteOne);

// reviews
router.post('/locations/:locationid/reviews', ctrlReviews.reviewsCreate);
router.get('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsReadOne);
router.put('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsUpdateOne);
router.delete('/locations/:locationid/reviews/:reviewid', ctrlReviews.reviewsDeleteOne);

module.exports = router;
