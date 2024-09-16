const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
// const ejs = require("ejs");
require("./db/conn");
const userdb = require("./models/registers")
const router = express.Router();




const port = process.env.PORT || 3000;
const static_path = path.join(__dirname, "../public");
const templets_path = path.join(__dirname, "../templets/views");
const partials_path = path.join(__dirname, "../templets/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));




app.use(express.static(static_path));
app.use(express.static("public"));
app.set("view engine", "hbs");
// app.set("view engine", "ejs");
app.set("views", templets_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("common_page");
});

app.get("/index", (req, res) => {
  res.render("index");
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.get("/profile", (req, res) => {
    res.render("profile");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/messages", (req, res) => {
  res.render("messages");
});

app.get("/help", (req, res) => {
  res.render("help");
});

// app.get("/alumni", (req, res) => {
//     res.render("alumni");
// });

// create a new user in our database
app.post("/signup", async (req,res) =>{
    try {
        const password =req.body.password;
        const cpassword = req.body.cpassword;

        if (password===cpassword){
            const logins = new userdb({
              image:req.body.image,
              type:req.body.type,
                fullname:req.body.fullname,
                email :req.body.email,                
                password :req.body.password,
                confirmpassword:req.body.cpassword,
                about:req.body.about

            });
            const users = await logins.save();
            res.status(201).render("index");
            

        }
        else{
            res.send("wrong password");
        }
        
    } catch (error) {
        res.status(400).send(error);
        
    }
})


// creating signin 

app.post("/signin" ,async (req,res)=>{
try {
    const email = req.body.email;
    const password= req.body.password;
    const useremail = await userdb.findOne({email:email});
   if (useremail.password=== password){
    res.status(201).render("index");
   }
   else{
    res.send("password are not matching");
   }


} catch (error) {
    res.status(400).send("invalid email");
}
})

  

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
});




  



// ---------------------------------------------


app.get('/alumni', async (req, res) => {
  try {
    const usersData = await userdb.find({}).exec();
    if (usersData) {
      res.status(200).render('alumni', { data: usersData });
    } else {
      res.status(404).send('No alumni data found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


app.get('/profile', async (req, res) => {
  try {
    const usersData = await userdb.find({}).exec();
    if (usersData) {
      res.status(200).render('profile', { data: usersData });
    } else {
      res.status(404).send('No alumni data found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});