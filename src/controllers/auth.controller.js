import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccesToken } from '../libs/jwt.js';

export const register = async (req, res) => {
    const {email, password, username} = req.body;
    
    try {
        //el numero es cuantas veces se ejecuta el algoritmo
        //1entra un hash se encripta
        const passwordHash = await bcrypt.hash(password, 10);
        
        //primero crear un objeto y luego podemos guardar
        //2entra un usuario se registra
        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        //3 se guarda el usuario
        const userSaved = await newUser.save();
        
        //4 se crea el token
        const token = await createAccesToken({id: userSaved._id})

        //guardar en cookie y responder en frontend
        res.cookie('token', token);
        
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createdAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });

    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
  
};

export const login = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        //buscar usuario
        const userFound = await User.findOne({email});
        if (!userFound) return res.status(400).json({message: "User not found"});
        //coincide?
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) return res.status(400).json({message: "Incorrect password"});
    

        const token = await createAccesToken({id: userFound._id})

        res.cookie("token", token);
        
        res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
        });

    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
  
};

export const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0),
    })
    return res.sendStatus(200)
}