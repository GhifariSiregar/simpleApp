import express from 'express';
import cors from "cors"
import { usersAuthRoute } from "../routes/routes.usersAuth";
import { usersDashboardRoute } from "../routes/routes.usersDashboard";

const app: any = express();
app.use(express.json());

//USE CORS
let allowedOrigins: any = ["http://localhost:3000"];
let allowCors: any = cors({
    'origin': allowedOrigins
})
app.use(allowCors);

//USER AUTH
app.use(usersAuthRoute.init());

//USER DASHBOARD
app.use(usersDashboardRoute.init());

app.listen(3300, () => {
    console.log("Listen at 3300")
});