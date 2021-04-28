import express from 'express';
import { usersAuthRoute } from "../routes/routes.usersAuth";
import { usersDashboardRoute } from "../routes/routes.usersDashboard";

const app = express();
app.use(express.json());

//USER AUTH
app.use(usersAuthRoute.init());

//USER DASHBOARD
app.use(usersDashboardRoute.init());

app.listen(3300, () => {
    console.log("Listen at 3300")
});