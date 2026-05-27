const Order = require("../model/Order")

const sendEmail = require("../utils/sendEmail")



const createOrder = async(req,res)=>{
    try {
        const {items, totalAmount, address, paymentId} = req.body;
        if(!items || items.length === 0 || !totalAmount || !address){
            return res.status(400).json({message:"invalid order data"});
        }
        
        const formattedItems = items.map(item => ({
            productId: item.productId || item._id,
            qty: item.qty,
            price: item.price
        }));

        const order = new Order({
            user:req.user._id,
            items: formattedItems,
            totalAmount,
            address,
            paymentId
        });

        await order.save();
        const message = `Dear ${req.user.name},\n\n thanks for your order! Your order has been successfully created with the following details :\n\n Order Id: ${order._id} \n Total amount: ${totalAmount} \n Shipping address: ${address.fullName}, ${address.street}, ${address.city}, ${address.postalCode}, ${address.country} \n\n We will notify you once your order is shipped.\n\n Best regards \nShopnest team`;

        await sendEmail(req.user.email, 'Order created', message);
        res.status(201).json({message:"Order created successfully",order});
    } catch (error) {
        console.error("Order creation error:", error);
        res.status(500).json({message:"error creating order", error: error.message});
    }
}

const myOrders = async(req,res)=>{
    try {
        const orders= await Order.find({user:req.user._id}).populate('items.productId','name price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({message:"Error in fetching orders",error})
    }
};


const getOrders = async(req,res)=>{
    try {
        const orders = await Order.find({}).populate('user','name email')
        res.json(orders)
    } catch (error) {
        res.status(500).json({message:"Error fetching orders ",error});
    }
};

const updateOrderStatus = async(req,res)=>{
    try {
        const {status}=req.body;
        const order= await Order.findById(req.params.id);
        if(order){
            order.status=status;
            await order.save()
            res.json({message:"order status updated",order});
        }else{
            res.status(404).json({message:"order not found"})
        }
    } catch (error) {
        res.status(500).json({message:"Error updating order status"},error)
    }
};

 


module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus

}