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

module.exports.register = (req, res, next) => {
    debug("Nueva Casa", {
        body: req.body
    });
    Casa.findOne({
            owner: req.body.owner
        })
        .then((foundCasa) => {
            if (foundCasa) {
                debug("Usuario duplicado");
                throw new Error(`Casa duplicada ${req.body.owner}`);
            } else {
                let newCasa = new Casa({
                    owner: req.body.owner,
                    first_name: req.body.firts_name || "",
                    last_name: req.body.last_name || "",
                    email: req.body.email,
                    password: req.body.password /*TODO: Modificar, hacer hash del password*/
                });
                return newCasa.save();
            }
        }).then(casa => {
            return res
                .header('Location', '/casas/' + casa.owner)
                .status(201)
                .json({
                    owner: casa.owner
                });
        }).catch(err => {
            next(err);
        });
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