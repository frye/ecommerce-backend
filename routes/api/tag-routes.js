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
	try {
		const tagId = req.params.id;
		const tagData = await Tag.findByPk(tagId, { include: { model: Product } });
		if (!tagData) {
			res.status(404).json({ message: 'No tag found' });
		}
		res.json(tagData);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.post('/', async (req, res) => {
	// create a new tag
	try {
	const newTag = await Tag.create(req.body);

	if (!newTag) {
		res.status(400).json({ message: 'No tag created' });
	}
	res.json(newTag);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.put('/:id', async (req, res) => {
	// update a tag's name by its `id` value
	try {
		const tagId = req.params.id;
		const tagData = await Tag.update(req.body, { where: { id: tagId } });
		if (!tagData) {
			res.status(400).json({ message: 'No tag updated' });
		}
		res.json(tagData);
	} catch (err) {
		res.status(400).json(err);
	}
});

router.delete('/:id', async (req, res) => {
	// delete on tag by its `id` value
	try {
		const tagId = req.params.id;
		const tagData = await Tag.destroy({ where: { id: tagId } });
		if (!tagData) {
			res.status(400).json({ message: 'No tag deleted' });
		}
		res.json(tagData);
	} catch (err) {
		res.status(400).json(err);
	}
});

module.exports = router;
