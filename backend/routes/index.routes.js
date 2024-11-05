import { Router } from "express";
// import notCookies from "../middlewares/notCookies.middlewarers.js";
import signup from "../controllers/signup.controllers.js";
import login from "../controllers/login.controllers.js";
import { getMyBooks, postMyBooks, deleteMyBooks, putMyBooks} from '../controllers/mybooks.controllers.js';
import { getMyWishlist, postWishlist, deleteMyWishlist, putWishlist } from '../controllers/mywishlist.controllers.js';
import { getCountingData } from '../controllers/countingdata.controllers.js';
import { postToken } from '../controllers/tokenvalidation.controllers.js';



const router = Router();

// Routes Auth
router.post('/login',  login);
router.post('/signup',  signup);

// Other Router
router.get('/mybooks', getMyBooks);
router.post('/mybooks', postMyBooks);
router.put('/mybooks/:id', putMyBooks);
router.delete("/mybooks/:id", deleteMyBooks)

router.get('/mywishlist', getMyWishlist);
router.post('/mywishlist', postWishlist);
router.put('/mywishlist/:id', putWishlist);
router.delete("/mywishlist/:id", deleteMyWishlist)

router.get("/countingdata", getCountingData);

router.post('/tokenvalidation', postToken);

export default router;