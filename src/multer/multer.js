import multer from "multer";

const storage = multer.diskStorage({
    destination: function (callback) {
        callback(null, './public/uploads')
    },
    filename: function (file, callback) {
        callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
        file.originalname = new Date().toISOString().replace(/:/g, '-') + file.originalname;
    }
});

export const upload = multer({
    storage: storage
    })