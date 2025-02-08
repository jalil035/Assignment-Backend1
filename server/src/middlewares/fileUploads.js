import multer from "multer";

const fileStorageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null,"api-img"+ Date.now() + "-");
    }
})

let uploads = multer({storage: fileStorageEngine});

export default uploads;