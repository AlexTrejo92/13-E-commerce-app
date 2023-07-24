const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/',async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const getAllTags = await Tag.findAll ({
      attributes: [
        'id',
        'tag_name'
      ],
      include: [{
        model: Product,
      }],
    });

    res.status(200).json(getAllTags);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getSingleTag = await Tag.findByPk (req.params.id, {
      attributes: [
        'id',
        'tag_name'
      ],
      include: [{
        model: Product,
      }],
    });

    if (!getSingleTag) {
      res.status(404).json({message: 'Couln\'t find this tag ID, try again with a different one'});
      return;
    }

    res.status(200).json(getSingleTag);

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createNewTag = await Tag.create(req.body);
    res.status(200).json(createNewTag);
  } catch(err) {
    res.status(400).json(err);
  }

});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try{

    const updateTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
    res.status(200).json(updateTag)

  } catch(err) {
    res.status(400).json(err);
  }

});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {

    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })

    if(!deleteTag) {
      res.status(404).json({message: "No tag found with that Id"})
      return
    }

    res.status(200).json(deleteTag)

  } catch(err) {
    res.status(400).json(err);
  }
});

module.exports = router;
