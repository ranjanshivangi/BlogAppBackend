import multer from "multer";

const storage = multer.diskStorage({
    destination: function (_req, _file, callback) {
        callback(null, './public/uploads')
    },
    filename: function (_req, file, callback) {
        callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
        file.originalname = new Date().toISOString().replace(/:/g, '-') + file.originalname;
    }
});

export const upload = multer({
    storage: storage
    })