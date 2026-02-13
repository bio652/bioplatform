const express = require("express"); 
const { connectDB, syncDB } = require('./data/db/db');
const path = require("path");
const cors = require("cors");
const { corsOptions } = require('./config');
const port = 3000;

const { usersrt } = require("./routes/usersRouter");
const { platformrt } = require("./routes/platformRouter");
const { adminrt } = require("./routes/adminRouter");

const app = express();
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname,"./staticfiles")));
app.use("/api/user", usersrt);
app.use("/api/platform", platformrt);
app.use("/api/admin", adminrt);

app.use((req, res, next) => {
    res.status(404).send("Not found 404 :(");
});

(async () =>{ 
    try{
        await connectDB(); 
        await syncDB(); 
        app.listen(port, () => {
            console.log(`Server started on port ${port}`);
        });
    }catch (err){
        console.error("Failed to start server:", err);
        process.exit(1);
    }
})();