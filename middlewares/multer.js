import multer from "multer";

const storage = multer.memoryStorage();

// const singleUpload = multer({ storage }).single("file");
const multipleUpload = multer({storage}).single("files")

export default multipleUpload;
