const router = require('express').Router();
const { User } = require('../models');


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({ 
            include: [
                { 
                    model: User,
                    attributes: ["username", "avatar_url"]  
                },
                {
                    model: Category,
                    attributes: ["name"]
                }
            ]
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('category', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;