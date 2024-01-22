const Data = require('../model/dataSchema')

const getData = async (req,res) => {
   
    try {
        const data = await Data.find({});
        res.status(200).json({msg: "Successfully fetched data.", data});
        
    } catch (error) {
        return res.status(500).json({msg:"Internal server error!"})
    }
}

module.exports = getData;