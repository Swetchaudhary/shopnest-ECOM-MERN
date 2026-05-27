const User = require("../model/User")
const Order = require("../model/Order")
const Product = require("../model/Product")


const getAdminStats = async(req,res)=>{
    try {
        const totalUser = await User.countDocuments({role:'user'})
        const totalOrder = await Order.countDocuments({})
        const totalProduct = await Product.countDocuments({})

        const orders = await Order.find({});
        const totalRevenueData = orders.reduce((acc,order)=> acc+order.totalAmount,0)

        res.json({
            totalUsers: totalUser,
            totalOrders: totalOrder,
            totalProducts: totalProduct,
            totalRevenue: totalRevenueData
        });

    } catch (error) {
        res.status(500).json({message:"error fetching stats",error});
    }
};

module.exports = {getAdminStats};