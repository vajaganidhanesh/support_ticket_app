const registerUser = (req,res) =>{
    const {name, email, password,skills} = req.body;
    
    if(!name || !email || !password){
       res.status(400)
       throw new Error('Please include all fields')
    }

    res.json({message:'Register Route',success:true,name,email,skills})
}

const loginUser = (req,res) =>{
    res.send({message:'Login Route'})
}

module.exports = {
    registerUser,
    loginUser,

}