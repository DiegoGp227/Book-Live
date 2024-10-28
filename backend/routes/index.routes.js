import { Router } from "express";
// import notCookies from "../middlewares/notCookies.middlewarers.js";
import signup from "../controllers/signup.controllers.js";
import login from "../controllers/login.controllers.js";
import { getMyBooks, postMyBooks } from '../controllers/mybooks.controllers.js';
import { getMyWishlist, postWishlist } from '../controllers/mywishlist.controllers.js';


const router = Router();

// Routes Auth
router.post('/login',  login);
router.post('/signup',  signup);

// Other Router
router.get('/mybooks', getMyBooks);
router.post('/mybooks', postMyBooks);

router.get('/mywishlist', getMyWishlist);
router.post('/mywishlist', postWishlist);


export default router;