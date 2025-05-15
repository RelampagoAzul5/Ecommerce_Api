import { Request, Response } from 'express';
import addressService from '../services/address.service';
import { PrismaClientKnownRequestError } from '../../generated/prisma/runtime/library';
import { AddressUpdateDTO } from '@/interfaces/address.interface';

class AddressControler {
  async createAddress(req: Request, res: Response) {
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }
    try {
      const address = await addressService.createAddress(req.body, userId);
      res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar endereço' });
    }
  }

  async getAddress(req: Request, res: Response) {
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const addresses = await addressService.getAddress(userId);
      if (addresses.length === 0) {
        res.status(404).json({ error: 'Endereços não encontrados' });
        return;
      }
      res.json(addresses);
    } catch (err) {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os endereços' });
    }
  }

  async deleteAddress(req: Request, res: Response) {
    const userId = Number(req.params.userId);
    const addressId = Number(req.params.addressId);
    if (isNaN(userId)) {
      res.status(400).json({ error: 'Id de usuário inválido' });
      return;
    }
    if (isNaN(addressId)) {
      res.status(400).json({ error: 'Id de endereço inválido' });
      return;
    }
    try {
      await addressService.deleteAddress(addressId, userId);
      res.json({
        message: `Endereço foi deletado com sucesso!`,
      });
      return;
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        res.status(404).json({ error: 'Endereço não encontrado' });
        return;
      }
      res.status(500).json({ error: 'Não foi possível deletar enderço' });
    }
  }

  async updateAddress(req: Request, res: Response) {
    const updatedAddressData: AddressUpdateDTO = req.body;
    const addressId = Number(req.params.addressId);
    const userId = Number(req.params.userId);

    if (isNaN(addressId)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    try {
      const address = await addressService.updateAddress(
        updatedAddressData,
        addressId,
        userId,
      );
      res.status(200).json(address);
    } catch (err) {
      if (
        err instanceof PrismaClientKnownRequestError &&
        err.code === 'P2025'
      ) {
        res.status(404).json({ error: 'Endereço não encontrado' });
        return;
      }
      res.status(500).json({ error: 'Não foi possível atualizar endereço' });
    }
  }
}

export default new AddressControler();
