import { Request, Response } from 'express';
import addressService from '../../services/user/address.service';
import { PrismaClientKnownRequestError } from '../../../generated/prisma/runtime/library';
import { AddressUpdateDTO } from '../../interfaces/address.interface';
import addressValitation from '../../utils/addressValidation';
import { JwtPayload } from 'jsonwebtoken';

class AddressControler {
  async createAddress(req: Request, res: Response) {
    const errors = addressValitation.addressCreateValitation(req.body);
    const userIdFromToken = (req.user as JwtPayload).userId;

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    try {
      const address = await addressService.createAddress(
        req.body,
        userIdFromToken,
      );
      res.status(201).json(address);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar endereço' });
    }
  }

  async getAddresses(req: Request, res: Response) {
    const userIdFromToken = (req.user as JwtPayload).userId;

    try {
      const addresses = await addressService.getAddresses(userIdFromToken);
      if (addresses.length === 0) {
        res.status(404).json({ error: 'Endereços não encontrados' });
        return;
      }
      res.json(addresses);
    } catch (err) {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar os endereços' });
    }
  }

  async getAddress(req: Request, res: Response) {
    const userIdFromToken = (req.user as JwtPayload).userId;
    const addressId = Number(req.params.addressId);

    try {
      const address = await addressService.getAddress(
        userIdFromToken,
        addressId,
      );
      if (!address) {
        res.status(404).json({ error: 'Endereço não encontrado' });
        return;
      }
      res.json(address);
    } catch (err) {
      res.status(500).json({ error: 'Ocorreu um erro ao buscar o endereço' });
    }
  }

  async deleteAddress(req: Request, res: Response) {
    const addressId = Number(req.params.addressId);
    const userIdFromToken = (req.user as JwtPayload).userId;

    if (isNaN(addressId)) {
      res.status(400).json({ error: 'Id de endereço inválido' });
      return;
    }

    try {
      await addressService.deleteAddress(addressId, userIdFromToken);
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
    const userIdFromToken = (req.user as JwtPayload).userId;

    const errors =
      addressValitation.addressUpdateValitation(updatedAddressData);

    if (isNaN(addressId)) {
      res.status(400).json({ error: 'ID inválido' });
      return;
    }

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    try {
      const address = await addressService.updateAddress(
        updatedAddressData,
        addressId,
        userIdFromToken,
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
