

export const fileUpload = (req,res)=>{
    try{

        if (req.files.length > 0) {
            return res
                .status(200)
                .json({
                    status: true,
                    file:req.files,
                    msg: "fileUpload successful"});
        }else {
            return res.status(200).json({ status: false,msg: "fileUpload failed"});
        }
    }catch (err){
         return { status: false, error: err };
    }
}