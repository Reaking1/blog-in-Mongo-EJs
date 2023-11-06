const express = require('express');
const router = express.Router();
const Post = require('../models/Post')



//Getting the Home page

router.get('', async (req,res) => {
    

        try {

            const locals = {
                title: "Oni Blog",
                description: "Building and Redesigning a Blog in Node.JS, Express and MongoDb."
            }


            let perPage = 10;
            let page = req.query.page || 1;

        const data = await Post.aggregate([ { $sort: {createdAt: -1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.count();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);


        res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute: '/'
        });
      

        
    } catch (error) {
        console.log(error)
    }


});
       //function inserThePost () {
      //     Post.insertMany([
                //{
        //        title: "Something we do all the time",
        //        body: "Emo body right here my friend"
         //   },
         //   {
              //  title: "Something we do all the time",
                //body: "Emo body right here my friend"
            //},
            //{
                //title: "Something we do all the time",
                //body: "Emo body right here my friend"
            //},
            //{
            //    title: "Something we do all the time",
            //    body: "Emo body right here my friend"
          //  },
           // {
              //  title: "Something we do all the time",
            //    body: "Emo body right here my friend"
          //  },
        //])
      //  }

        //inserThePost();






  


//Getting a Post by its :id

router.get('/post/:id', async (req,res) => {
    try {
        let slug = req.params.id;

        const data = await Post.findById({ _id: slug });

        const locals = {
            title: data.title,
            description: "Building and Redesigning a Blog in Node.JS, Express and MongoDb."
        }

        res.render('post', {
            locals,
            data,
            currentRoute: `/post/${slug}`
        });

    } catch (error) {
        console.log(error);
    }
});


// A post  for the searchTerm
router.post('/search', async (req,res) => {
    try {
        const locals = {
            title:"Search",
            description: "Building and Redesigning a Blog in Node.JS, Express and MongoDb"
        }
        let searchTerm = req.body.searchTerm;
        const searchNoSC = searchTerm.replace(/[^a-zA-Z0-9]/g, "")

        const data = await Post.find({
            $or: [
                { title: {$regex: new RegExp(searchNoSC,'i')}},
                { body: {$regex: new RegExp(searchNoSC, 'i')}}
            ]
        });

        res.render('search', {
            data,
            locals,
            currentRoute: '/'
        })
    } catch (error) {
        console.log(error);
    }
});



//Getting the about page

router.get('/about', (req,res) => {
    res.render('about', {
        currentRoute: '/about'
    });
});

//Getting the contact page
router.get('/contact', (req,res) => {
    res.render('contact', {
        currentRoute: '/contact'
    });
});


module.exports = router;