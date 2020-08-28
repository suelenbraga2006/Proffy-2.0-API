import {Request, Response} from 'express';
import { uuid } from 'uuidv4';
import { hash } from 'bcryptjs';
import * as nodemailer from 'nodemailer';
import db from '../database/connection';
import * as crypto from 'crypto';

export default class UsersController {
    async index (request: Request, response: Response) {}
    async create(request: Request, response: Response) {
        const {
            name,
            lastname,
            email,
            password,
            avatar,
            whatsapp,
            bio,
        } = request.body;

        try {
            const [user_id] = await db('users').where('email', email).select('id');

            if (user_id) {
                return response.status(400).json({
                    error: 'This email already exists.'
                });
            }

            const hashedPassword = await hash(password, 8);

            const [id] = await db('users').insert({
                id: uuid(),
                name,
                lastname,
                email,
                password: hashedPassword,
                avatar: avatar ? avatar : 'https://images.freeimages.com/images/large-previews/023/geek-avatar-1632962.jpg',
                whatsapp,
                bio,
            }); 

            return response.status(201).json({id});
        } catch(err) {
            return response.status(400).json({
                error: 'Unexpected error while creating a new user'
            })
        }
    }

    async forgot(request: Request, response: Response) {
        const { email } = request.body;

        try {
            const [user] = await db('users').where('email', email).select('id', 'email');

            const transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                    user: process.env.MAILTRAP_USER,
                    pass: process.env.MAILTRAP_PASSWORD
                }
            });

            const newPassword = crypto.randomBytes(4).toString('hex');

            transporter.sendMail({
                from: 'Administrador<5943688c3a-c7ff09@inbox.mailtrap.io>',
                to: user.email,
                subject: 'Recuperação de senha do portal Proffy',
                html: `<h3>Olá</h3><p>Esta é sua nova senha para acessar o portal Proffy: <strong>${newPassword}</strong></p><p><a href='http://localhost:3000/'>Acesse o Proffy agora e faça login</a></p>`
            }).then(async () => {
                const newPasswordHashed = await hash(newPassword, 8);

                await db('users').where({ email }).update({ password: newPasswordHashed });

                return response.status(200).json({
                    message: `E-mail sended to ${user.id}`,
                });
                
            });

        } catch(err) {
            return response.status(400).json({
                error: 'Unexpected error while creating a new password'
            })
        }
    }
}