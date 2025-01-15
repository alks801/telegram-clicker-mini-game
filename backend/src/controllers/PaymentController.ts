import { Request, Response } from 'express';
import { PaymentModel } from '../models/PaymentModel';
import { Pool } from 'pg';

export class PaymentController {
    private paymentModel: PaymentModel;

    constructor(pool: Pool) {
        this.paymentModel = new PaymentModel(pool);
    }

    // Create Payment
    async createPayment(req: Request, res: Response) {
        const { userId, paymentType, amount } = req.body;
        try {
            // Check user balance
            let balance: number;
            if (paymentType === 'stars') {
                balance = await this.paymentModel.checkTelegramStarsBalance(userId);
            } else if (paymentType === 'ton') {
                const walletAddress = req.body.walletAddress; // TON wallet address
                balance = await this.paymentModel.checkTONBalance(walletAddress);
            } else {
                return res.status(400).json({ error: 'Invalid payment type' });
            }

            // Check if enough balance
            if (balance < amount) {
                return res.status(400).json({ error: 'Insufficient balance' });
            }

            // Create Payemnt Entity
            const payment = await this.paymentModel.createPayment(userId, paymentType, amount);

            // Wait for Payment
            let paymentSuccess: boolean;
            if (paymentType === 'stars') {
                paymentSuccess = await this.paymentModel.waitForTelegramStarsPayment(payment.id);
            } else if (paymentType === 'ton') {
                const walletAddress = req.body.walletAddress;
                paymentSuccess = await this.paymentModel.waitForTONPayment(walletAddress, amount);
            } else {
                return res.status(400).json({ error: 'Invalid payment type' });
            }

            if (paymentSuccess) {
                // Update payment status
                await this.paymentModel.updatePaymentStatus(payment.id, 'completed');
                res.status(200).json({ message: 'Payment successful', payment });
            } else {
                // Update payment status
                await this.paymentModel.updatePaymentStatus(payment.id, 'failed');
                res.status(400).json({ error: 'Payment failed' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Get user payments
    async getPayments(req: Request, res: Response) {
        const { userId } = req.params;
        try {
            const payments = await this.paymentModel.getPaymentsByUserId(Number(userId));
            res.status(200).json(payments);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    // Update user payment
    async updatePaymentStatus(req: Request, res: Response) {
        const { id } = req.params;
        const { status } = req.body;
        try {
            const payment = await this.paymentModel.updatePaymentStatus(Number(id), status);
            res.status(200).json(payment);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}