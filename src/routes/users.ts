import express, { Router, Request, Response } from "express";
import PGModels from "../models";
import bcrypt from "bcrypt";
import { Model, Op } from "sequelize";

const router: Router = express.Router();

const saltRounds = 10;


// router.get("/register", async (req: Request, res: Response): Promise<void> => {
//   res.send("This is the GET method of register page.");
// })
//
// router.get("/login", async (req: Request, res: Response): Promise<void> => {
//   res.send("This is the GET method of login page.");
// })

router.post("/register", async (req: Request, res: Response): Promise<any>=> {

  const existingUser  = false
  try {
    const {userName, userPassword, confirmPassword} = req.body;
    console.log("Body: \n", req.body)

    if (userPassword != confirmPassword){
      res.status(400).send({
        status: 'error',
        message: '(400) Mismatched confirm password.'
      })
    }
    if (existingUser){
      res.status(500).send({
        status: 'error',
        message: '(409) Email has already been registered.'
      })
    }

    const hashedPassword: string = await bcrypt.hash(userPassword, saltRounds)

    const newUser = {
      userName: userName,
      userEmail: req.body.userEmail,
      userPassword: hashedPassword,
    }

    const users: Model = await PGModels.User.create(newUser);

    res.json({
      users: users,
      status: 'success',
      message: 'Successfully registered.'
    })

  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 'error',
      message: '(500) Registration failed.'
    });
  }
});

router.post("/login", async (req: Request, res: Response): Promise<any> => {

  const {userName, userPassword} = req.body;
  const existingUser  = false

  try{
    if (!userName || !userPassword){
      res.status(500).send({
        status: 'error',
        message: '(409) Either username or password cannot be null.'
      })
    }
  } catch (err){
    res.status(500).send({
      status: 'error',
      message: '(500) Unexpected Error.'
    });
  }


  try {
    console.log("Body: \n", req.body)


    const hashedPassword: string = await bcrypt.hash(userPassword, saltRounds)

    const users: Model<string, string>[] = await PGModels.User.findAll({
      where :{
        [Op.and]: [{userName: userName}, {userPassword: hashedPassword}]
      }
    });

    console.log("Checking user's password: ", users);

    // const password = await PGModels.User.findOne({
    //   where: {
    //     userPassword: hashedPassword
    //   }
    // })

    // const isValid: boolean = bcrypt.compareSync(userPassword, password);

    res.json({
      users: users,
      status: 'success',
      message: 'Successfully Login.'
    })
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 'error',
      message: '(500) Login failed.'
    });
  }
});
export default router
