import express from "express";
import cookie from "cookie";

const router = express.Router();

router.get('/api/users/refresh', async (req, res) => {
    const { refresh } = req.cookies;

    const body = JSON.stringify({
        refresh: refresh,
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

        if (apiResponse.status === 200) {
            res.setHeader('Set-Cookie', [
                cookie.serialize('access', data.access, {
                    httpOnly: true,
                    maxAge: 1800, // 30 minutes
                    path: '/api/',
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                }),
            ])

            return res.status(200).json({ success: 'Refreshed successfully' });
        } else {
            return res.status(apiResponse.status).json(data);
        }
    } catch (error: any) {
        return res.status(500).json({
            error: 'Smth went wrong when trying to refresh login status'
        });
    }
});

module.exports = router;