import Dashboard from '../model/dashboard.js';

export const getDashboard = async (req, res) => {
    try {
        const fetchAll = await Dashboard.find({creator: req.query.creator });
        res.status(201).json(fetchAll)
    } catch (error) {
        res.status(400).json(error)
    }
}


export const createDashboard = async (req, res) => {
    const title = new RegExp(req.body.category, "i")
    try {
        const findPost = await Dashboard.findOne({ category: title, creator : req.body.creator });
        // let created;
        if(!findPost) {
            const createNew = await Dashboard({
                category: req.body.category,
                user: req.body.user,
                creator: req.body.creator,
                quantityIn: req.body.quantityIn,
                quantityOut: req.body.quantityOut,
                amountIn: req.body.amountIn,
                amountOut: req.body.amountOut,
                buyPrice: req.body.type === "incomming" ? req.body.price : 0,
            }).save()
            res.status(201).json(createNew);
        }
        
        else if(findPost) {
            findPost.quantityIn = Number(findPost.quantityIn) + Number(req.body.quantityIn);
            findPost.quantityOut = Number(findPost.quantityOut) + Number(req.body.quantityOut);
            findPost.amountIn = Number(findPost.amountIn) + Number(req.body.amountIn);
            findPost.amountOut = Number(findPost.amountOut) + Number(req.body.amountOut);
            findPost.buyPrice = (req.body.type === "incomming" & findPost.buyPrice < Number(req.body.price))
                ? Number(req.body.price)
                : findPost.buyPrice;

            const created = await findPost.save()
            res.status(201).json(created);
        }
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}


export const deleteDashboard = async (req, res) => {
    try {
        let updated;
        const incomming = "incomming";
        const outgoing = "outgoing"
        const title = new RegExp(req.body.category, "i")
        const findPost = await Dashboard.findOne({ category: title })

        if (findPost) {
            findPost.quantityIn = req.body.type === incomming ?
                (Number(findPost.quantityIn) - Number(req.body.quantity))
                : quantityIn;
            findPost.quantityOut = req.body.type === outgoing ?
                (Number(findPost.quantityOut) - Number(req.body.quantity))
                : quantityOut;
            findPost.amountIn = req.body.type === incomming ?
                (Number(findPost.amountIn) - Number(req.body.amount))
                : amountIn;
            findPost.amountOut = req.body.type === outgoing ?
                (Number(findPost.amountOut) - Number(req.body.amount))
                : amountOut;
            updated = findPost.save()
            res.status(201).json(updated);
        }
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}

