const bcrypt=require('bcryptjs');

const helpers ={};
const saltRounds = 10;
helpers.encriptarPass = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    return hash;
    console.log(hash);

};


helpers.loggin= async (password , savedPasword)=>{

    try{

       
        return  await  bcrypt.compare(password , savedPasword);
    }
    catch(e){
console.log(e);

    }


};


module.exports= helpers;