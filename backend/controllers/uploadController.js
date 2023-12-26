const imageDownloader = require('image-downloader');
const createError = require('http-errors')

const uploadByLink = async(req,res,next) => {
    const { link } = req.body
    try{
        const newName = Date.now()+".jpg"
        await imageDownloader.image({
            url: link,
            dest: __dirname + "/../uploads/" + newName
        })
        res.status(200).json("upload by link success")
    }
    catch(err){
        console.log(err)
        next(createError(500,"upload by link failed"))
    }
}

module.exports = {uploadByLink} 