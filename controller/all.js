import Inventory from '../model/history.js';

export const getAllPosts = async (req, res) => {
        const{ user } = req.query;
        try {        
            const allUserPost = await Inventory.find({creator: user}).sort({_id:-1})
            const total = await Inventory.countDocuments({creator: user});
            res.status(200).json({data:allUserPost, total})
    } catch (error) {
        res.status(400).json(error)
    }
}
