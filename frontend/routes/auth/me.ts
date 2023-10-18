import express from "express";

const router = express.Router();

router.get('/api/users/me', async (req, res: any) => {
    const { access } = req.cookies;

    try {
        const apiResponse = await fetch(`${process.env.API_URL}/api/users/me`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${access}`,
            }
        });

        const data = await apiResponse.json();

        return res.status(apiResponse.status).json(data);
    } catch (error: any) {
        return res.status(500).json({
            error: 'Smth went wrong when trying to retrieve user'
        });
    }
});

module.exports = router;