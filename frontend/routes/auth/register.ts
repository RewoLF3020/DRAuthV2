import express from "express";
import { RequestInfo, RequestInit } from "node-fetch";

// const fetch = (url: RequestInfo, init?: RequestInit) =>  import("node-fetch").then(({ default: fetch }) => fetch(url, init));

const router = express.Router();

router.post('/api/users/register', async (req, res) => { // register without / at the end because redux extraReducer add urls
    const body = JSON.stringify(req.body); // instead of next 2 points

    // const { first_name, last_name, email, password } = req.body;

    // const body = JSON.stringify({
    //     first_name,
    //     last_name,
    //     email,
    //     password,
    // });

    try {
        const registerResponse = await fetch(`${process.env.API_URL}/api/users/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body,
        });

        const data = await registerResponse.json();

        return res.status(registerResponse.status).json(data);
    } catch (error: any) {
        return res.status(500).json({
            error: 'Smth went wrong when registering account'
        });
    }
});

module.exports = router;
// export default router;