const prisma = require("../utils/prisma");
const xlsx = require("xlsx");
const uploadData = async (req, res) => {
    const file = req.file;

    const password = req.body.password;
    if (!file) {
        return res.status(400).json({error: '未上传文件'});
    }

    if (password !== process.env.DELETE_PASSWORD) {
        return res.status(401).json({error: "无效凭证！"});
    }

    try {
        const workbook = xlsx.read(file.buffer, {type: 'buffer'});
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);
        // 每批插入 100 条
        const batchSize = 100;
        for (let i = 0; i < data.length; i += batchSize) {
            const chunk = data.slice(i, i + batchSize);
            await prisma.data.createMany({
                data: chunk.map(v => {
                    return {
                        ...v,
                        session_order_id: v.session_order_id.toString(),
                    }
                }),
                skipDuplicates: true,
            });
        }

        return res.json({
            message: "上传成功！"
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            error: "文件数据格式错误！请检查！",
        });
    }
}

const getData = async (req, res) => {
    try {
        let data = await prisma.data.groupBy({
            by: ["session_order_id"],

        });
        data = Object.groupBy(data, ({session_order_id}) => session_order_id);

        res.status(200).json({
            success: true,
            message: "success",
            data,
        });
    } catch (e) {
        res.status(500).json({
            success: false,
            message: "server error",
        });
    }
}

const dataDetail = async (req, res) => {
    const session_order_id = req.params.id;
    try {
        const data = await prisma.data.findMany({
            where: {
                session_order_id,
            },
            orderBy: {
                round_in_session: 'asc',
            }
        });

        return res.json({
            data,
        });
    } catch (e) {
        return res.status(500).json({
            error: "网络错误！",
        });
    }
}

const deleteSession = async (req, res) => {
    const session_order_id = req.params.id;
    const password = req.body.password;
    if (password !== process.env.DELETE_PASSWORD) {
        return res.status(401).json({error: "无效凭证！"});
    }
    try {
        await prisma.data.deleteMany({
            where: {
                session_order_id,
            }
        });
        return res.json({
            message: '成功！',
        });
    } catch (e) {
        return res.status(500).json({
            error: "网络错误！"
        });
    }
}

const deleteAllSession = async (req, res) => {
    try {
        const password = req.body.password;
        if (password !== process.env.DELETE_PASSWORD) {
            return res.status(401).json({error: "无效凭证！"});
        }
        await prisma.data.deleteMany();
        return res.json({
            message: '成功！',
        });
    } catch (e) {
        return res.status(500).json({
            error: "网络错误！"
        });
    }
}


module.exports = {
    getData,
    dataDetail,
    uploadData,
    deleteSession,
    deleteAllSession,
}