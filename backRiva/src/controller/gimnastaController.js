import { Gimnasta } from "../model/gimnasta.js";

export const deleteGimnasta = async (req, res) => {
    try {
        const {id_gimnasta} = req.params;
        res.json(await Gimnasta.destroy({
            where: {
                id_gimnasta: id_gimnasta
            }
        }))
    } catch (error) {
        
    }
}

export const deleteAll = async (req, res) => {
    try {
        await Gimnasta.destroy({
            truncate:true
        })
        res.status(200).send({message: 'Gimnastas Eliminadas'});
    } catch (error) {
        
    }
}

export const getGimnasta = async (req, res) =>{
    try {
        const {categoria, nivel, genero} = req.query;
        if(categoria == undefined && nivel == undefined){
            res.json(await getGimnastasByCategoryAndLevel(categoria, nivel, "all", genero));
        }else{
            res.json(await getGimnastasByCategoryAndLevel(categoria, nivel, "club", genero));
        }
    } catch (error) {
        return res.status(500).json({ message: error.message }); 
    }
}

export const getGimnastaById = async (req, res) => {
    try {
        const {id_gimnasta} = req.params;
        res.json(await Gimnasta.findByPk(id_gimnasta));
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export const getGimnastasByCategoryAndLevel = async (categoria, nivel, order, genero) => {
    try {
        if(order == 'total'){
            const gimnasta = await Gimnasta.findAll({
                where: {
                    categoria: categoria,
                    nivel: nivel,
                    genero: genero
            }, order: [[order, 'DESC']]})
            return gimnasta;
        }else if(order == 'all'){
            const gimnasta = await Gimnasta.findAll({order: ["club"]})
            return gimnasta;
        }else{
            const gimnasta = await Gimnasta.findAll({
                where: {
                    categoria: categoria,
                    nivel: nivel,
                    genero: genero
            }, order: [order]})
            return gimnasta;
        }
    } catch (error) {
        return error;
    }
}

export const createGimnasta = async (req, res) => {
    try {
        const gimnasta = await Gimnasta.create(req.body);
        if(gimnasta){
            res.json({message: "Gimnasta guardada"});
        }else{
            res.json({message: "Error"});
        }
    } catch (error) {
        return res.status(500).json({ message: error.message }); 
    }
}



export const updateGimnasta = async (req, res) =>{
    try {
        const {id_gimnasta} = req.params
        const jugador = await Gimnasta.findByPk(id_gimnasta);
        jugador.set(req.body)
        await jugador.save();
        res.json(jugador);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const sumarTotal = async (req, res) => {
    try {
        const {categoria, nivel, genero} = req.body
        const gimnasta = await getGimnastasByCategoryAndLevel(categoria, nivel, "club", genero);

        gimnasta.forEach(async gimnasta => {
            const valorSuelo = parseFloat(gimnasta.suelo);
            const valorParalela = parseFloat(gimnasta.paralela);
            const valorViga = parseFloat(gimnasta.viga);
            const valorSalto = parseFloat(gimnasta.salto);
            const total = valorSuelo + valorParalela + valorViga + valorSalto
            await gimnasta.update({total: total});
        });
        const nueva = await getGimnastasByCategoryAndLevel(categoria, nivel, "total", genero);
        res.json(nueva);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const setSalto = async (req, res) => {
    try {
        const {id_gimnasta} = req.params
        const {aparato} = req.body

        const gimnasta = await Gimnasta.findByPk(id_gimnasta);

        if(gimnasta){
            await gimnasta.update({salto: aparato})
            res.send("updated");
        }else{
            res.send("gimnasta not exist");
        }


    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

export const setSuelo = async (req, res) => {
    try {
        const {id_gimnasta} = req.params
        const {aparato} = req.body

        const gimnasta = await Gimnasta.findByPk(id_gimnasta);

        if(gimnasta){
            gimnasta.update({suelo: aparato})
            res.send("updated");
        }else{
            res.send("gimnasta not exist");
        }


    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

export const setViga = async (req, res) => {
    try {
        const {id_gimnasta} = req.params
        const {aparato} = req.body

        const gimnasta = await Gimnasta.findByPk(id_gimnasta);

        if(gimnasta){
            gimnasta.update({viga: aparato})
            res.send("updated");
        }else{
            res.send("gimnasta not exist");
        }


    } catch (error) {
        return res.status(500).json({ message: error.message });

    }
}

export const setParalela = async (req, res) => {
    try {
        const {id_gimnasta} = req.params
        const {aparato} = req.body

        const gimnasta = await Gimnasta.findByPk(id_gimnasta);

        if(gimnasta){
            gimnasta.update({paralela: aparato})
            res.send("updated");
        }else{
            res.send("gimnasta not exist");
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}