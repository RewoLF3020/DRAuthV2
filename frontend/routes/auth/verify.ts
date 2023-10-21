import express from "express";

const router = express.Router();

router.get('/api/users/verify', async (req, res) => {
    const { access } = req.cookies;

    const body = JSON.stringify({
        token: access,
    })

    try {
        const apiResponse = await fetch(`${process.env.API_URL}/api/token/verify/`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body,
        });

        const data = await apiResponse.json();

        return res.status(apiResponse.status).json(data);
    } catch (error: any) {
        return res.status(500).json({
            error: 'Smth went wrong when trying to verify account'
        });
    }
});

module.exports = router;