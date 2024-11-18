import express, { Request, Response } from "express";
import PGModels from "../models";
import bcrypt from "bcrypt";

const router = express.Router();


router.post("/register", async (req: Request, res: Response): Promise<any>=> {
  
  // const existingUser = await db.collection('users').findOne({
  //   user_email: userEmail
  // })

  const existingUser  = false
  try {
    const {userName, userPassword, confirmPassword} = req.body;
    console.log("Body: ", req.body)
    if (userPassword != confirmPassword){
      console.log("userPassword: ", userPassword)
      res.status(400).send({
        status: 'error',
        message: '(400) Mismatched confirm password.'
      })
    }
    if (existingUser){
      console.log("existingUser: ", existingUser)
      res.status(500).send({
        status: 'error',
        message: '(409) Email has already been registered.'
      })
    }
    console.log("existingUser: ", existingUser)
    
    const saltRounds = 10;
    let hashedPassword = await bcrypt.hash(userPassword, saltRounds)
    // Store hash in your password DB.
    // Callback 計算完後才會執行。

    const newUser = {
      userName: userName,
      userEmail: req.body.userEmail,
      userPassword: hashedPassword,
      // enable: false
    }

    const users = await PGModels.User.create(newUser);

    res.json({
      status: 'success',
      message: 'Sucessfully registered.'
    })

  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 'error',
      message: '(500) Registration failed.'
    });
  }
});

router.get("/login", async (req: Request, res: Response) => {
  try {
    const users = await PGModels.User.create({
      firstName: "firstName",
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});
export default router