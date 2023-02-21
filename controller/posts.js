import Inventory from '../model/posts.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
        const {page, category, user} = req.query;
        const title = new RegExp(category, "i")
        // console.log(title)
        const LIMIT = 15;
        const startIndex= (Number(page)-1) * LIMIT;
    try {
        const total = await Inventory.countDocuments({
            // $or : [ {user}, {title} ]
            creator: user, 
            category: title

        });
        const totalPages = Math.ceil(total/LIMIT)

        // const NoLimitTotal= await Inventory.find({creator: user, category: title})
        
        const TotalInventory = await Inventory.find(
            {
                creator: user, 
                category: title
            }).sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        res.status(200).json({slicedData: TotalInventory, page, pageNumbers: totalPages, total, limit: LIMIT})
    } catch (error) {
        res.status(400).json(error)
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const Item = await Inventory.findById(id)
        res.status(200).json(Item)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Inventory(post);
    try {
        const createdPost = await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No Post With That Id")
    const UpdatedPost = await Inventory.findByIdAndUpdate(id, post, { new: true })
    res.status(200).json(UpdatedPost)
}

export const deletePost = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(402).send("No post with that id")
    await Inventory.findByIdAndRemove(id)
    res.json({ message: "Post Deleted Successfully" })
}