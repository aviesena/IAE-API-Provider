const express = require("express");
const supabase = require("@supabase/supabase-js");
const jwt = require("jsonwebtoken");
const app = express();
const secret = "FQzJPco+c2FTmS8Jh/QX4RUODZ0lsoIS0MWmqql35YX8O9WAyURZ5hmGbUoe50VX4npF9phnTZeTHQ1Rq2t/Xg==";
app.use(express.json());

const Supabase_URl = "https://utzdhilbitfcdeljnctj.supabase.co";
const Supabase_Key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0emRoaWxiaXRmY2RlbGpuY3RqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE3MjAyOTQsImV4cCI6MjAyNzI5NjI5NH0.oTHeYvKzSEGcoBu8pbMMeDWvbzmwiEFIzEUQBUmbgKk";

const db = supabase.createClient(Supabase_URl, Supabase_Key);

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).json({ message: "Token is required!" });
  }
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

app.get("/", verifyToken, async (req, res) => {
  const response = await db.from("api_provider").select();
  res.json(response.data);
});

app.post("/", async (req, res) => {
  const { nama, nim } = req.body;
  const user = { nama, nim };
  const token = jwt.sign({user}, secret)
  const Post = await db.from("api_provider").insert({ nama, nim });
  res.json({ 
    Post
  });
});

app.post("/login", async (req, res) => {
  const { nama, nim } = req.body;
  try {
    const { data, error } = await db.from("api_provider").select().eq("nama", nama).eq("nim", nim);
    if (error) {
      throw error;
    }
    if (data && data.length > 0) {
      const token = jwt.sign({ nama, nim }, secret);
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(2001, () => {
  console.log("Server started on port 2001");
});
