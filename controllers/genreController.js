const { Band, BandGenre, Genre } = require("../models");

class genreController{

    static index = async(req,res,next) => {
        try {
            let genres = await Genre.findAll();
            res.json({ genres });
        } catch (error) {
            next(error)
        }
    }

}

module.exports = genreController