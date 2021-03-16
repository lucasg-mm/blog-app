const Post = require("../models/post-model");

// gets every post in the db
exports.getAllPosts = async () => {
    try{
        const allPosts = await Post.findAll();
        return allPosts 
    }
    catch(err){
        console.log("Could not fetch posts!");
        console.log(err);
    }
}

