import { Router } from "express";
const router = new Router();
import { getGimnasta, sumarTotal, setSalto, setParalela, setSuelo, setViga, createGimnasta} from "../controller/gimnastaController.js";

router.get('/', getGimnasta);
// router.post('/', createUser);
// router.get('/:email', getUserByEmail);
// router.post('/login/', loginUser);
router.post('/', createGimnasta);
router.put('/setSalto/:id_gimnasta', setSalto);
router.put('/setParalela/:id_gimnasta', setParalela);
router.put('/setViga/:id_gimnasta', setViga);
router.put('/setSuelo/:id_gimnasta', setSuelo);
router.post('/total', sumarTotal);
// router.delete('/:email', deleteUser);

export default router;