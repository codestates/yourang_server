const jwt = require("jsonwebtoken");

export default class JWTController{

    public Verify:Function = (authorization)=>{
        
        if(authorization){
            
            return jwt.verify(authorization,process.env.ACCESS_SECRET,
                (err,decoded)=>{
                    if(decoded){
                        return decoded;
                    }else{
                        return err;
                    }
            });
        }
    }

    public getAccessToken:Function=(userInfo)=>{
        const access_token = jwt.sign({
            id:userInfo.id,
            userId:userInfo.userId,
            email:userInfo.email,
            phone:userInfo.phone
        },process.env.ACCESS_SECRET,{expiresIn:"1days"});
        return access_token;
    }

    public getRefreshToken:Function=(userInfo)=>{
        const refresh_token = jwt.sign({
            id:userInfo.id,
            userId:userInfo.userId,
            email:userInfo.email,
            phone:userInfo.phone
        },process.env.REFRESH_SECRET,{expiresIn:"2days"});
        return refresh_token;        
    }
}