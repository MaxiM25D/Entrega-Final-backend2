import { PurchaseService } from "../services/purchase.service.js";

const purchaseService = new PurchaseService();

export const purchaseCart = async (req, res) => {

  try {

    const cartId = req.params.cid;

    const userEmail = req.user.email;

    const result = await purchaseService.purchaseCart(cartId, userEmail);

    res.json({
      message: "Purchase completed",
      ticket: result.ticket,
      productsNotPurchased: result.productsNotPurchased
    });

  } catch (error) {

    res.status(500).json({ error: error.message });

  }

};