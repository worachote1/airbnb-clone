const imageDownloader = require('image-downloader');
const createError = require('http-errors')
const multer = require('multer')

const max_images = 5;
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${__dirname}/../uploads`)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '--' + file.originalname);
    }
});
const upload = multer({ storage: fileStorageEngine });

const uploadFromDevice = (req, res, next) => {
    try { 
      upload.array('photos', max_images)(req, res, (err) => {
        if (err) { 
          console.log(err);
          return next(createError(400, "Multiple File upload failed."));
        }
        console.log(req.files);
        res.status(200).json(req.files);
      });
    } catch (err) {
      console.log(err);
      next(createError(400, "Multiple File upload failed44."));
    }
  };

const uploadByLink = async(req,res,next) => {

    const { link } = req.body
    const newName = Date.now() + '--' + '.jpg'
    try{
        const test = await imageDownloader.image({
            url: link, 
            dest: `${__dirname}/../uploads/${newName}`
            // dest: `${__dirname}/../../client/public/uploads/${newName}`

        }) 
        console.log(test)
        return res.status(200).json(newName)
    }
    catch(err){
        console.log(err)
        next(createError(400,"upload by link failed"))
    }
}

module.exports = {uploadFromDevice, uploadByLink} 