// import bcrypt from "bcrypt";

// const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// const isValidPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);
 
// export {createHash, isValidPassword}


// Utilizaremos el modulo de bcrypt.
import bcrypt from "bcrypt";
//Importamos la libreria de uuid para generar identificadores unicos
import {v4 as uuidv4} from 'uuid';
// importamos una libreria para formato de fechas
import { format } from 'date-fns';
// Funcion de hasheo
 const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

 const isValidPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

// funcion de creacion de id ticket unico.
const ticketId = () => uuidv4();

// funcion de totalizar para la compra. va a recibir un array con los products del cart.

const totalize = (products) =>
    products.reduce((total, product) => total + (product.product.price * product.quantity), 0);

// const buyTime = () => new Date().toISOString();

const buyTime = () => format(new Date(), 'dd/MM/yyyy HH:mm:ss');


export  {
    createHash,
    isValidPassword,
    ticketId,
    totalize,
    buyTime
};