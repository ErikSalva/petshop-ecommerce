import { User } from "../../models/index.js"


export const getUserByEmail = async (email) => {
    return await User.findOne({
        where:{
            email
        }
     })
}

export const getUserById = async (id) => {
    return await User.findByPk(id)
}

export const registerUser = async (name, email, password, token) =>{
    return await User.create({
        name,
        email,
        password_hash: password,
        token
    })

}

export const getUserByToken =  (token) => {
    return  User.findOne({
        where:{
            token
        }
     })
}

export const updateUser = async (user) => {
    await user.save()
}