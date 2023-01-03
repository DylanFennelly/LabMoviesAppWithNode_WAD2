import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Register OR authenticate a user
router.post('/',asyncHandler( async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
      res.status(401).json({success: false, msg: 'Please pass username and password.'});
      return next();
    }
    if (req.query.action === 'register') {
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(req.body.password)){
            await User.create(req.body);
        }else{
            res.status(401).json({code: 201, msg: 'Registration failed: bad password. Please ensure password is at least 5 characters long and contains a number.'});
        }
      res.status(201).json({code: 201, msg: 'Successful created new user.'});
    } else {
      const user = await User.findByUserName(req.body.username);
        if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            // if user is found and password matches, create a token
            const token = jwt.sign(user.username, process.env.SECRET);
            // return the information including token as JSON
            res.status(200).json({success: true, token: 'BEARER ' + token});
          } else {
            res.status(401).json({code: 401,msg: 'Authentication failed. Wrong password.'});
          }
        });
      }
  }));

 // Update a user
 router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code:200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
}); 

router.get('/:userName/favourites', asyncHandler( async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('favourites');
    res.status(200).json(user.favourites);
  }));


//Add a favourite
router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    const user = await User.findByUserName(userName);

    // console.log(newFavourite)
    // console.log(userName)
    // console.log(user)

    if (newFavourite === undefined) {
      res.status(401).json({success: false, msg: 'Please pass movie id.'});
      return next();
    }
    if ( await user.favourites.includes(newFavourite)){
        res.status(401).json({code: 401,msg: 'Movie is already in user\'s favourites.'});
    }else{
        await user.favourites.push(newFavourite);
        await user.save(); 
        res.status(201).json(user); 
    }
  }));


router.delete('/:userName/favourites', asyncHandler(async (req, res) => {
    const favouriteToDel = req.body.id;
    const userName = req.params.userName;
    const user = await User.findByUserName(userName);

    // console.log(favouriteToDel)
    // console.log(userName)
    // console.log(user)

    await user.favourites.pull(favouriteToDel);
    await user.save(); 
    res.status(201).json(user); 
  }));



  
//tv favourites

router.get('/:userName/tvFavourites', asyncHandler( async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName).populate('tvFavourites');
  res.status(200).json(user.tvFavourites);
}));


//Add a favourite
router.post('/:userName/tvFavourites', asyncHandler(async (req, res) => {
  const newFavourite = req.body.id;
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);

  // console.log(newFavourite)
  // console.log(userName)
  // console.log(user)

  if (newFavourite === undefined) {
    res.status(401).json({success: false, msg: 'Please pass tv id.'});
    return next();
  }
  if ( await user.tvFavourites.includes(newFavourite)){
      res.status(401).json({code: 401,msg: 'TV is already in user\'s favourites.'});
  }else{
      await user.tvFavourites.push(newFavourite);
      await user.save(); 
      res.status(201).json(user); 
  }
}));


router.delete('/:userName/tvFavourites', asyncHandler(async (req, res) => {
  const favouriteToDel = req.body.id;
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);

  // console.log(favouriteToDel)
  // console.log(userName)
  // console.log(user)

  await user.tvFavourites.pull(favouriteToDel);
  await user.save(); 
  res.status(201).json(user); 
}));



  
//actor favourites

router.get('/:userName/actorFavourites', asyncHandler( async (req, res) => {
  const userName = req.params.userName;
  const user = await User.findByUserName(userName).populate('actorFavourites');
  res.status(200).json(user.actorFavourites);
}));


//Add a favourite
router.post('/:userName/actorFavourites', asyncHandler(async (req, res) => {
  const newFavourite = req.body.id;
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);

  // console.log(newFavourite)
  // console.log(userName)
  // console.log(user)

  if (newFavourite === undefined) {
    res.status(401).json({success: false, msg: 'Please pass actor id.'});
    return next();
  }
  if ( await user.actorFavourites.includes(newFavourite)){
      res.status(401).json({code: 401,msg: 'Actor is already in user\'s favourites.'});
  }else{
      await user.actorFavourites.push(newFavourite);
      await user.save(); 
      res.status(201).json(user); 
  }
}));


router.delete('/:userName/actorFavourites', asyncHandler(async (req, res) => {
  const favouriteToDel = req.body.id;
  const userName = req.params.userName;
  const user = await User.findByUserName(userName);

  // console.log(favouriteToDel)
  // console.log(userName)
  // console.log(user)

  await user.actorFavourites.pull(favouriteToDel);
  await user.save(); 
  res.status(201).json(user); 
}));

export default router;