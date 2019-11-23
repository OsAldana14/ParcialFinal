var Casa = require('../models/casa');
var debug = require('debug')('casa:casa_controller');

// Search a one casa y database
module.exports.getOne = (req, res, next) => {
    debug("Buscar Casa", req.params);
    Casa.findOne({
            owner: req.params.owner
        })
        .then((foundCasa) => {
            debug("Casa Encontrada", foundCasa);
            if (foundCasa)
                return res.status(200).json(foundCasa);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Lista de Casas", {
        size: perPage,
        page,
        sortby: sortProperty,
        sort
    });

    Casa.find({})
        .limit(perPage)
        .skip(perPage * page)
        .sort({
            [sortProperty]: sort
        })
        .then((casas) => {
            debug("Casa encontrada", casa);
            return res.status(200).json(casa)
        }).catch(err => {
            next(err);
        });

}

// Nueva Casa

module.exports.insert = (req, res)=>{
    /**
     * Para ver el funcionamiento de req.body hacer:
     * console.log(req.body);
     */

    if(!req.body.owner || !req.body.ubicacion || !req.body.habitaciones ||  req.body.cochera ==undefined){
        return res.status(400).json({
            message: "There are missing fields",
        });
    }
    
    let register = new Register(
        req.body
    );

    register.datetime = new Date();

    register.save((err, nRegister)=>{
        if(err) return res.status(500).json({
            message: "Something happend trying to insert Register",
        });

        res.status(200).json({
            message: "Insert registration was successful",
            register: nRegister
        });
    })
}



// Update casa 

module.exports.update = (req, res, next) => {
    debug("Update casa", {
        owner: req.params.owner,
        ...req.body
    });

    let update = {
        ...req.body
    };

    Casa.findOneAndUpdate({
            owner: req.params.owner
        }, update, {
            new: true
        })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });
}

module.exports.delete = (req, res, next) => {

    debug("Delete casa", {
        owner: req.params.owner,
    });

    Casa.findOneAndDelete({owner: req.params.owner})
    .then((data) =>{
        if (data) res.status(200).json(data);
        else res.status(404).send();
    }).catch( err => {
        next(err);
    })
}