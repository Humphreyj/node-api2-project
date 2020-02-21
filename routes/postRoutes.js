const express =  require('express');
const router = express.Router();
const data = require('../data/db');

//Get Posts
router.get('/', (req, res) => {
    data.find()
    .then(response => {
        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'Failed to retrieve posts!'
        })
    })
})
//Get Post By Id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    data.findById(id)
    .then(response => {
        if(response){
            res.status(200).json(response);
        }else {
            res.status(404).json({
                message: 'This post could not be found.'
            })
        } 
    }) //.then
    .catch(err => {
        console.log(err)
        res.status(500).json({
            err,err: 'There was an internal server error.'
        })
    }) //.catch
})

//Edit Post
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {title, contents} = req.body
    if(!title || !contents){
        res.status(400).json({message: 'You need a Title AND Contents!'})
    }else{
        data.update(id,req.body)
        .then(response => {
            if(response === 1) {
                res.status(200).json(req.body);
            }
        })
        .catch(err => {
            res.status(500).json({err,err:'The information could not be modified.'})
        })
    }
})
//Add new post
router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents){
        res.status(400).json({message: "you need a Title AND Contents!"})
    }else{
        data.insert(req.body)
        .then(response => {
            res.status(201).json(response);
        })
        .catch(err => {
            res.status(500).json({err,err: 'There was a problem adding your post.'})
        })
    }
})

//Delete Post
router.delete('/:id', (req, res) => {
    const {id} = req.params;
    data.remove(id)
    .then(response => {
        if(response && response > 0){
            res.status(204).json({message: 'The Post has been deleted.'})
        }
    })
    .catch(err => {
        res.status(500).json({err,err:'The post was unable to be deleted.'})
    })
})


//Get Comments
router.get('/:id/comments', (req, res) => {
    const {id} = req.params
    data.findPostComments(id)
    .then(response => {
        res.status(200).json(response)
    })
    .catch(err => {
        res.status(500).json({err,err :'The post does not exist!'})
    })
})

//Add New Comment
router.post('/:id/comments', (req, res) => {
    const {id} = req.params;
    const {text} = req.body;
    let commentObj ={
        text: text,
        post_id: id

    }
    if(!text) {
       return res.status(404).json({message:'Comment text cannot be empty.'})
    }
    data.insertComment(commentObj)
    .then(response =>{
        console.log(response)
        res.status(201).json(commentObj)
    })
    .catch(err => {
        res.status(500).json({err,err:'Unable to add your comment.'})
    })

})

module.exports = router;