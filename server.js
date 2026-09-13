const express = require("express");
const cors = require("cors");

const db = require("./database");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

/* =========================================================
   TEST SERVER
========================================================= */

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Scan Ganesha server is running"
    });
});


/* =========================================================
   GET ALL USERS
========================================================= */

app.get("/api/users", (req, res) => {
    try {

        const users = db.prepare(`
            SELECT *
            FROM users
            ORDER BY created_at DESC
        `).all();

        res.json(users);

    } catch (error) {

        console.error(
            "Get users error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch users"
        });
    }
});


/* =========================================================
   ADD NEW USER
========================================================= */

app.post("/api/users", (req, res) => {

    try {

        const {
            name,
            score = 0,
            time_seconds = 0,
            moves = 0,
            status = "Not Completed"
        } = req.body;


        if (
            !name ||
            !name.trim()
        ) {

            return res.status(400).json({
                success: false,
                message: "Name is required"
            });

        }


        const result = db.prepare(`
            INSERT INTO users
            (
                name,
                score,
                time_seconds,
                moves,
                status
            )
            VALUES (?, ?, ?, ?, ?)
        `).run(

            name.trim(),

            Number(score),

            Number(time_seconds),

            Number(moves),

            String(status)

        );


        res.json({

            success: true,

            id: result.lastInsertRowid,

            message:
                "User saved successfully"

        });


    } catch (error) {

        console.error(
            "Add user error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Failed to save user"

        });
    }

});


/* =========================================================
   UPDATE USER PUZZLE RESULT
========================================================= */
/* =========================================================
   UPDATE USER PUZZLE RESULT / DIVINE WISH
========================================================= */

app.put(
    "/api/users/:id",
    (req, res) => {

        try {

            const userId =
                Number(req.params.id);

            if (
                !Number.isInteger(userId) ||
                userId <= 0
            ) {

                return res.status(400).json({
                    success: false,
                    message: "Invalid user ID"
                });

            }


            // Get existing user data
            const existingUser =
                db.prepare(`
                    SELECT *
                    FROM users
                    WHERE id = ?
                `).get(userId);


            if (!existingUser) {

                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });

            }


            // Keep existing values when they are not sent
            const score =
                req.body.score !== undefined
                    ? Number(req.body.score)
                    : existingUser.score;

            const time_seconds =
                req.body.time_seconds !== undefined
                    ? Number(req.body.time_seconds)
                    : existingUser.time_seconds;

            const moves =
                req.body.moves !== undefined
                    ? Number(req.body.moves)
                    : existingUser.moves;

            const status =
                req.body.status !== undefined
                    ? String(req.body.status)
                    : existingUser.status;

            const final_wish =
                req.body.final_wish !== undefined
                    ? String(req.body.final_wish)
                    : existingUser.final_wish;


            // Update user
            db.prepare(`
                UPDATE users
                SET
                    score = ?,
                    time_seconds = ?,
                    moves = ?,
                    status = ?,
                    final_wish = ?
                WHERE id = ?
            `).run(

                score,

                time_seconds,

                moves,

                status,

                final_wish,

                userId

            );


            res.json({

                success: true,

                message:
                    "User data updated successfully"

            });


        } catch (error) {

            console.error(
                "Update user error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to update user data"

            });

        }

    }
);



/* =========================================================
   LEADERBOARD
========================================================= */

app.get(
    "/api/leaderboard",
    (req, res) => {

        try {

            const leaderboard =
                db.prepare(`
                    SELECT
                        name,
                        score,
                        time_seconds,
                        moves,
                        status
                    FROM users
                    WHERE status = 'Completed'
                    ORDER BY
                        score DESC,
                        time_seconds ASC
                `).all();


            res.json(
                leaderboard
            );


        } catch (error) {

            console.error(
                "Leaderboard error:",
                error
            );

            res.status(500).json({

                success: false,

                message:
                    "Failed to fetch leaderboard"

            });

        }

    }
);


/* =========================================================
   START SERVER
========================================================= */

app.listen(
    PORT,
    () => {

        console.log(
            `✅ Scan Ganesha server running at http://localhost:${PORT}`
        );

    }
);