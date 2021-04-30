const router = require('express').Router();
const { Post, User, Category } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({ 
            include: [
                { 
                    module: User,  
                },
            ],
        }),

        const Posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;