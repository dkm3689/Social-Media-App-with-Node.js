import app from "./index.js";

import { connectToDB } from "./src/config/db.js";

app.listen( 3600, () => {
    console.log("server is listening on port 3600");
    connectToDB();
});