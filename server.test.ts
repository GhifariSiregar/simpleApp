import app from "./src/app";
import supertest from "supertest";

const request: any = supertest(app);


//======================================== USER AUTH TESTING ===========================================

//-------------LOGIN TEST----------------------------
it("Successfully Login Test", async (done) => {

    //LOGIN CREDENTIAL TEST
    const loginData = {
        "email": "aaa@aa.com",
        "password": "K123sdsada."
    };

    //TEST THE ENDPONT
    const response: any = await request.post("/login").send(loginData);

    //RESPONSE STATUS SUCCESS
    expect(response.status).toBe(200);

    //TOKEN RECEIVED
    expect(JSON.parse(response.text).token).toBeDefined();

    done();
})

it("Wrong Login Credential", async (done) => {

    //LOGIN CREDENTIAL TEST
    const loginData: any = {
        "email": "aaa@aa.com",
        "password": "K123sdsasda."
    };

    //TEST THE ENDPONT
    const response: any = await request.post("/login").send(loginData);

    //RESPONSE STATUS BAD REQUEST
    expect(response.status).toBe(400);

    done();
})


//====================================== USER DASBOARD TESTING =========================================