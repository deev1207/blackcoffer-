const Data = require('../../models/data')
const asyncHandler = require("express-async-handler");
const json_data = require('../../jsondata.json')
const data_controller = {

    insertData: asyncHandler(async (req, res) => {
        const result = await Data.insertMany(json_data)
        res.send(result)

    }),

    getData: asyncHandler(async (req, res) => {
        const result = await Data.find({})
        res.send(result)

    }),

    getIntensity: asyncHandler(async (req, res) => {
        const pipeline = [
            {
                $group: {
                    _id: "$country",
                    totalIntensity: { $sum: "$intensity" }
                }
            },
            {
                $project: {
                    country: "$_id",
                    totalIntensity: 1,
                    _id: 0
                }
            }
        ];
        const result = await Data.aggregate(pipeline).exec()
        res.send(result)
    }),
    getLikelihood: asyncHandler(async (req, res) => {
        const pipeline = [
            {
                $group: {
                    _id: "$country",
                    totalLikelihood: { $sum: "$likelihood" }
                }
            },
            {
                $project: {
                    country: "$_id",
                    totalLikelihood: 1,
                    _id: 0
                }
            }
        ];
        const result = await Data.aggregate(pipeline).exec()
        res.send(result)
    }),
    getSector: asyncHandler(async (req, res) => {
        const sectorCounts = await Data.aggregate([
            { $group: { _id: '$sector', count: { $sum: 1 } } },
            {
                $project: {
                    sector: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ]);
        res.json(sectorCounts);
    })


}



module.exports = data_controller;