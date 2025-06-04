import { Router } from "express";
import { find, findOne } from "../controllers/book.controller.js";

const BookRouter = new Router();

BookRouter.get('/', find)
BookRouter.get('/:slug', findOne)

export default BookRouter;