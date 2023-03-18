import Inventory from '../model/history.js';
import mongoose from 'mongoose';

export const getHistory = async (req, res) => {
    try {     
        const TotalHistory = await Inventory.find({creator: req.query.creator})
        const totalQuantity = TotalHistory.length
        res.status(200).json({data: TotalHistory, totalQuantity})
    } catch (error) {
        res.status(400).json(error)
    }
}


export const getHistoryByQuery = async (req, res) => {
        const {page, category, creator} = req.query;
        const title = new RegExp(category, "i");
        const limit = 10;
        const startIndex= (Number(page)-1) * limit;
    try {
        const quantity = await Inventory.countDocuments({
            creator, 
            category: title
        });
        const totalPages = Math.ceil(quantity/limit)
        
        const TotalInventory = await Inventory.find(
            {
                creator, 
                category: title
            }).sort({ _id: -1 }).limit(limit).skip(startIndex);
        res.status(200).json({data: TotalInventory, page, totalPages, quantity, limit })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getHistoryById = async (req, res) => {
    const {id } = req.params;
    const _id = id;
    const { creator } = req.query;
    try {
        const Item = await Inventory.findOne({_id , creator})
        res.status(200).json(Item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createHistory = async (req, res) => {   
    const newHistory = new Inventory({
        category: req.body.category,
        user:  req.body.user,
        type: req.body.type,
        price: req.body.price,
        creator: req.body.creator,
        quantity: req.body.type==="incomming"? req.body.quantityIn : req.body.quantityOut,
        location: req.body.location,
        amount: req.body.type==="incomming"? req.body.amountIn : req.body.amountOut,
        date: req.body.date 
    });
    try {
        const createdHistory = await newHistory.save();
        res.status(201).json(createdHistory);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}

export const updateHistory = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post With That Id")
    const UpdatedPost = await Inventory.findByIdAndUpdate(id, post, { new: true })
    res.status(200).json(UpdatedPost)
}

export const deleteHistory = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(402).send("No post with that id")
    await Inventory.findByIdAndRemove(id)
    res.json({ message: "Post Deleted Successfully" })
}