import { Router } from "express";
const router = new Router();
import { getGimnasta, sumarTotal, setSalto, setParalela, setSuelo, setViga, createGimnasta, getGimnastaById, deleteGimnasta, deleteAll} from "../controller/gimnastaController.js";

router.get('/', getGimnasta);
router.get('/:id_gimnasta', getGimnastaById);

router.post('/', createGimnasta);
router.put('/setSalto/:id_gimnasta', setSalto);
router.put('/setParalela/:id_gimnasta', setParalela);
router.put('/setViga/:id_gimnasta', setViga);
router.put('/setSuelo/:id_gimnasta', setSuelo);
router.post('/total', sumarTotal);
router.delete('/all', deleteAll);
router.delete('/:id_gimnasta', deleteGimnasta);

export default router;