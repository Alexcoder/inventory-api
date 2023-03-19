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
                stock : (Number(req.body.quantityIn)- Number(req.body.quantityOut)),
                balance : (Number(req.body.amountIn)- Number(req.body.amountOut)),
                buyPrice: req.body.type === "incomming" ? req.body.price : 0,
            }).save()
            res.status(201).json(createNew);
        }
        
        else if(findPost) {
            findPost.quantityIn = Number(findPost.quantityIn) + Number(req.body.quantityIn);
            findPost.quantityOut = Number(findPost.quantityOut) + Number(req.body.quantityOut);
            findPost.stock = Number(findPost.quantityIn) - Number(findPost.quantityOut);
            findPost.amountIn = Number(findPost.amountIn) + Number(req.body.amountIn);
            findPost.amountOut = Number(findPost.amountOut) + Number(req.body.amountOut);
            findPost.balance = Number(findPost.amountIn) - Number(findPost.amountOut);
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
    console.log(req.body)
    try {
        let updated;
        const incomming = "incomming";
        const outgoing = "outgoing"
        const title = new RegExp(req.body.category, "i")
        const findPost = await Dashboard.findOne({ category: title, creator: req.body.creator })

        const quantityIn = req.body.type===incomming ? req.body.quantity : 0;
        const quantityOut = req.body.type===outgoing ? req.body.quantity : 0;
        const amountIn = req.body.type===incomming ? req.body.amount : 0;
        const amountOut = req.body.type===outgoing ? req.body.amount : 0;

        if (findPost) {
            findPost.quantityIn = Number(findPost.quantityIn) - Number(quantityIn);
            findPost.quantityOut = Number(findPost.quantityOut) - Number(quantityOut);
            findPost.stock = Number(findPost.quantityIn) - Number(findPost.quantityOut);
            findPost.amountIn = Number(findPost.amountIn) - Number(amountIn);
            findPost.amountOut = Number(findPost.amountOut) - Number(amountOut);
            findPost.balance = Number(findPost.amountIn) - Number(findPost.amountOut);
            updated = findPost.save()
            res.status(201).json(updated);
        }
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}

