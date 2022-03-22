const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
	// find all categories
	// be sure to include its associated Products
	const categoryData = await Category.findAll({ include: { model: Product } });

	if (!categoryData) {
		res.status(404).json({ message: 'No categories found' });
	}
	res.json(categoryData);

});

router.get('/:id', async (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	const categoryId = req.params.id;
	const categoryData = await Category.findByPk(categoryId, { include: { model: Product } });

	if (!categoryData) {
		res.status(404).json({ message: 'No category found' });
	}
	res.json(categoryData);
});

router.post('/', async (req, res) => {
	// create a new category
	const newCategory = await Category.create(req.body);

	if (!newCategory) {
		res.status(400).json({ message: 'No category created' });
	}
	res.json(newCategory);
});

router.put('/:id', async (req, res) => {
	// update a category by its `id` value
	const categoryId = req.params.id;
	const updatedCategory = await Category.update(req.body, { where: { id: categoryId } });

	if (!updatedCategory) {
		res.status(400).json({ message: 'No category updated' });
	}
	res.json(updatedCategory);
});

router.delete('/:id', async (req, res) => {
	// delete a category by its `id` value
	const categoryId = req.params.id;
	try {
		const categoryData = await Category.destroy({ where: { id: categoryId } });
		if (!categoryData) {
			res.status(400).json({ message: 'No category deleted' });
		}
		res.json(categoryData);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
