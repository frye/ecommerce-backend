const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
	// find all tags
	// be sure to include its associated Product data
	try {
		const tagData = await Tag.findAll({ include: { model: Product } });
		if (!tagData) {
			res.status(404).json({ message: 'No tags found' });
		}
		res.json(tagData);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.get('/:id', async (req, res) => {
	// find a single tag by its `id`
	// be sure to include its associated Product data
});

router.post('/', async (req, res) => {
	// create a new tag
});

router.put('/:id', async (req, res) => {
	// update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
	// delete on tag by its `id` value
});

module.exports = router;
