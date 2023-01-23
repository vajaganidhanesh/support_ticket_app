const registerUser = (req,res) =>{
    const {name, email, password,skills} = req.body;
    
    if(!name || !email || !password){
       return res.status(400).json({message:'Please include all fields',success:false})
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