const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {

    const findAllCategories = await Category.findAll({
      include: [
        {model: Product}
      ]
    });

    res.status(200).json(findAllCategories);

  } catch (err) {
    res.status(400).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products

  try {

    const categoryById = await Category.findByPk(req.params.id, {
      include: [
        {model: Product}
      ]
    })

    if (!categoryById) {
        res.status(404).json({message: 'Category not found with this ID, Try again with another ID'});
        return;
    }

    res.status(200).json(categoryById);

  } catch(err) {
    res.status(400).json(err);
  }

});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create(req.body);
    res.status(200).json(createCategory);
  } catch(err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })

    if(!updateCategory) {
      res.status(404).json({message: 'Category not found with this ID'})
    }

    res.status(200).json(updateCategory)

  } catch (err) {
    res.status(400).json(err);}
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      }
    });

    if (!deleteCategory) {
      res.status(404).json({message: 'Category not found, please use another ID'})
    }

    res.status(200).json({message: 'Category deleted succesfully'})

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
