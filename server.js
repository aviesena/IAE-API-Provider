const express = require("express")
const supabase = require("@supabase/supabase-js")
const app = express()
app.use(express.json())

const Supabase_URl = "https://utzdhilbitfcdeljnctj.supabase.co"
const Supabase_Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0emRoaWxiaXRmY2RlbGpuY3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MjAyOTQsImV4cCI6MjAyNzI5NjI5NH0.oTHeYvKzSEGcoBu8pbMMeDWvbzmwiEFIzEUQBUmbgKk"

const db = supabase.createClient(Supabase_URl, Supabase_Key)

app.get("/", async (req, res) => {
    const response = await db.from("api_provider").select()
    res.json(response.data)
})

app.post("/", async (req, res) => {
    const { nama, nim } = req.body
    const Post = await db.from("api_provider").insert({nama, nim})
    res.json({Post})
})

app.listen(2001, () => {console.log("Server started on port 2001")})