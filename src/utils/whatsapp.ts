import { WHATSAPP_NUMBER } from '../data/storeData';
import { Product, CartItem } from '../types';

export function createGeneralWhatsAppUrl(message?: string): string {
  const defaultText = message || 'Hi Frame Hub! I would like to inquire about your premium wall frames.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultText)}`;
}

export function createProductWhatsAppUrl(product: Product, quantity = 1, selectedSize?: string, customNote?: string): string {
  const sizeText = selectedSize ? `Size: ${selectedSize}` : `Size: ${product.dimensions}`;
  const noteText = customNote ? `\nCustom Request: ${customNote}` : '';
  const subtotal = product.price * quantity;
  const isFreeDelivery = subtotal >= 2999;
  const deliveryFee = isFreeDelivery ? 0 : 300;
  const finalTotal = subtotal + deliveryFee;
  const deliveryText = isFreeDelivery ? 'FREE (Orders of Rs. 2,999 or above)' : 'Rs. 300';
  
  const text = `Hi Frame Hub! I want to order this product:
  
*Product:* ${product.name}
*Price:* Rs. ${product.price.toLocaleString()}
*Quantity:* ${quantity}
*Set:* ${product.setSize}
*${sizeText}*${noteText}

*Subtotal:* Rs. ${subtotal.toLocaleString()}
*Delivery Charges:* ${deliveryText}
*Final Total:* Rs. ${finalTotal.toLocaleString()}

Please guide me on sending my photos for printing. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function createCustomFrameWhatsAppUrl(config: {
  frameType: string;
  size: string;
  borderStyle: string;
  customText?: string;
  price: number;
}): string {
  const captionText = config.customText ? `\n*Custom Text/Quote:* ${config.customText}` : '';
  
  const text = `Hi Frame Hub! I designed a custom frame on your website:

*Frame Type:* ${config.frameType}
*Border Style:* ${config.borderStyle}
*Dimensions:* ${config.size}
*Estimated Price:* Rs. ${config.price.toLocaleString()}${captionText}

I will share my photo attachment here. Please confirm my design and delivery details.`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function createDesignCodeWhatsAppUrl(
  designCode: string,
  title: string,
  category: string,
  selectedSize?: { label: string; dimensions?: string; price: number }
): string {
  if (category === 'Motivational' || designCode.startsWith('FH-MOT-') || designCode.startsWith('FT-MOT-')) {
    const text = `I want Motivational Design ${designCode}, size 8×12 inches.`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  }

  const sizeText = selectedSize
    ? `\n*Selected Option:* ${selectedSize.label}\n*Estimated Price:* Rs. ${selectedSize.price.toLocaleString()}`
    : '';

  const text = `Hi FRAME HUB! I want to order this design from your Design Gallery:

*Design Code:* ${designCode}
*Design Title:* ${title}
*Category:* ${category}${sizeText}

Please guide me on how to send my photos for printing. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function createCartWhatsAppUrl(
  cart: CartItem[],
  subtotal: number,
  deliveryFee: number,
  total: number,
  customerDetails?: { name: string; city: string; address: string }
): string {
  const itemsList = cart
    .map(
      (item, idx) =>
        `${idx + 1}. *${item.product.name}* (Qty: ${item.quantity}) - Rs. ${(item.product.price * item.quantity).toLocaleString()}`
    )
    .join('\n');

  let customerText = '';
  if (customerDetails && (customerDetails.name || customerDetails.city || customerDetails.address)) {
    customerText = `\n\n*Customer Details:*
Name: ${customerDetails.name || 'Not provided'}
City: ${customerDetails.city || 'Karachi'}
Address: ${customerDetails.address || 'Not provided'}`;
  }

  const deliveryText = deliveryFee === 0 ? 'FREE (Orders of Rs. 2,999 or above)' : `Rs. ${deliveryFee.toLocaleString()}`;

  const text = `Hi Frame Hub! I would like to place an order for the following cart items:

${itemsList}

*Subtotal:* Rs. ${subtotal.toLocaleString()}
*Delivery Charges:* ${deliveryText}
*Final Total:* Rs. ${total.toLocaleString()}${customerText}

Please confirm my order and let me know how to send photos. Thank you!`;

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
