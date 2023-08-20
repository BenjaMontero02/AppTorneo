import { Gimnasta } from "../model/gimnasta.js";

export const getGimnasta = async (req, res) =>{
    try {
        const {categoria, nivel} = req.query;
        console.log({categoria, nivel});
        res.json(await getGimnastasByCategoryAndLevel(categoria, nivel, "club"));
    } catch (error) {
        return res.status(500).json({ message: error.message }); 
    }
}

export const getGimnastasByCategoryAndLevel = async (categoria, nivel, order) => {
    try {
        if(order == 'total'){
            const gimnasta = await Gimnasta.findAll({
                where: {
                    categoria: categoria,
                    nivel: nivel
            }, order: [[order, 'DESC']]})
            return gimnasta;
        }else{
            const gimnasta = await Gimnasta.findAll({
                where: {
                    categoria: categoria,
                    nivel: nivel
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
        console.log(gimnasta);
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
        const {categoria, nivel} = req.body
        const gimnasta = await getGimnastasByCategoryAndLevel(categoria, nivel, "club");

        gimnasta.forEach(async gimnasta => {
            const valorSuelo = parseFloat(gimnasta.suelo);
            const valorParalela = parseFloat(gimnasta.paralela);
            const valorViga = parseFloat(gimnasta.viga);
            const valorSalto = parseFloat(gimnasta.salto);
            const total = valorSuelo + valorParalela + valorViga + valorSalto
            await gimnasta.update({total: total});
        });
        const nueva = await getGimnastasByCategoryAndLevel(categoria, nivel, "total");
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