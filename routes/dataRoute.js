const {getRouter} = require("../utils/tool");
const router = getRouter();
const {uploadData, getData, dataDetail, deleteAllSession, deleteSession} = require('../controllers/dataController');
const multer = require('multer');

const upload = multer({
    limits: {fileSize: 20 * 1024 * 1024},
    storage: multer.memoryStorage(),
});


router.post('/data', upload.single('file'), uploadData);
router.get('/data', getData);
router.get('/data/:id', dataDetail);
router.delete('/delete-data/:id', deleteSession);
router.delete('/delete-data', deleteAllSession);


module.exports = router;