import express from "express";
import cookie from "cookie";

const router = express.Router();

router.post('/api/users/login', async (req, res) => {
    const body = JSON.stringify(req.body);

    try {
        const apiResponse = await fetch(`${process.env.API_URL}/api/token/`, {
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
                cookie.serialize('refresh', data.refresh, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24, // 1 day
                    path: '/api/',
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production'
                })
            ])

            return res.status(200).json({ success: 'Login successfully' });
        } else {
            return res.status(apiResponse.status).json(data);
        }
    } catch (error: any) {
        return res.status(500).json({
            error: 'Smth went wrong when logging in',
        })
    }
});

module.exports = router;