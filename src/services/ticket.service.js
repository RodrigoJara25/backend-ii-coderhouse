import crypto from "crypto";

import cartRepo from "../repository/cart.repository.js";
import ticketRepo from "../repository/ticket.repository.js";

import productModel from "../dao/models/product.model.js";

export default class TicketService {
    async checkout(cartId, purchaserEmail) {
        const cart = await cartRepo.getById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }
        if (!Array.isArray(cart.products) || cart.products.length === 0) {
            throw new Error("Carrito vacío");
        }

        const purchasedItems = [];  // { productId, quantity, price }
        const notProcessedIds = []; // productId sin stock o no encontrado
        let amount = 0;

        // Verificar stock y preparar items para la compra
        for (const item of cart.products) {
            const prod = await productModel.findById(item.product);
            if (!prod) {
                notProcessedIds.push(String(item.product));
                continue;
            }
            const quantity = Number(item.quantity || 0);
            if (prod.stock >= quantity && quantity > 0) {
                // restar stock
                prod.stock -= quantity;
                await prod.save();
                purchasedItems.push({
                    productId: String(prod._id),
                    quantity: quantity,
                    price: prod.price
                });
                amount += (prod.price || 0) * quantity;
            } else {
                notProcessedIds.push(String(prod._id));
            }
        }

        if (purchasedItems.length === 0) {
            // No se pudo comprar nada: no crear ticket, solo devolver no procesados
            // Mantener carrito tal cual 
            await cartRepo.update(cartId, {
                products: cart.products.filter(p => notProcessedIds.includes(String(p.product)))
            });
            return {
                ticket: null,
                notProcessed: notProcessedIds
            };
        }

        // Crear ticket
        const ticketData = {
            code: crypto.randomUUID(),
            purchase_datetime: new Date(),
            amount,
            purchaser: purchaserEmail
        }
        const ticket = await ticketRepo.create(ticketData);

        // Actualizar carrito para dejar solo los no procesados
        await cartRepo.update(cartId, {
            products: cart.products.filter(p => notProcessedIds.includes(String(p.product)))
        });

        return {
            ticket,
            purchasedProducts: purchasedItems,
            notProcessed: notProcessedIds
        };
    }
}
