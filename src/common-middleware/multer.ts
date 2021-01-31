import AWS from "aws-sdk";
import multer from "multer"
import multerS3 from "multer-s3";
import {config} from 'dotenv';
config();

export default class Multer{

    private S3 = new AWS.S3({
        accessKeyId:process.env.AWS_ACCESSKEY_ID,
        secretAccessKey:process.env.AWS_SECRETKEY,
        region:process.env.AWS_REGION
    });

    public getProfileUpload = ()=>{
        const upload = multer({
            storage:multerS3({
                s3:this.S3,
                bucket:process.env.AWS_BUCKET_NAME+"/user_profile",
                acl:"public-read",
                cacheControl: "max-age=31536000",
                contentType: multerS3.AUTO_CONTENT_TYPE,
                key: (req,file,cb)=>{
                    cb(null,Date.now().toString())
                },
                size:5*1024*1024,
            })
        });
        return upload
   }

    public getDeletePhoto = (key:string)=>{
        let filename = key.split("/");
        
        const param = {
            Bucket : process.env.AWS_BUCKET_NAME+"/user_profile",
            Key : filename[filename.length-1]
        }
        this.S3.deleteObject(param,(err,data)=>{
            if(err) return err
            else return data
        });
    }
}


 
