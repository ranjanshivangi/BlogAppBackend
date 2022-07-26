import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads')
    },
    filename: function (req, file, callback) {
        callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    }
});

export const upload = multer({
    storage: storage
})