var express = require('express');
var router = express.Router();
const data_controller = require('../controllers/data_controller/data')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/data', data_controller.getData);

router.post('/data', data_controller.insertData)

router.get('/intensity', data_controller.getIntensity);
router.get('/likelihood', data_controller.getLikelihood);
router.get('/sector', data_controller.getSector);
module.exports = router;
