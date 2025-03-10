import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: "./env"
})

connectDB()
.then(() => {
    // Listen for error
    app.on("error", (error) => {
        console.log("ERROR", error)
        throw error
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at ${process.env.PORT}`)
    })
})
.catch(error => {
    console.log("MONDO db connection failed !!!", error)
})







/*
( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERROR: ", error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on post ${process.env.PORT}`)
        })

    } catch(error){
        console.error("ERROR: ", error)
        throw error
    }
})()
*/