import { NextApiRequest, NextApiResponse } from 'next';
import ControleEditora from '../../../classes/controle/ControleEditora';

export default (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'GET') {
        try {
            const codEditora = Number(req.query.codEditora);
            const controle = new ControleEditora();
            const nomeEditora = controle.getNomeEditora(codEditora);

            if (nomeEditora) {
                const response = { nomeEditora };
                res.status(200).json(response);
            } else {
                res.status(404).json({ error: 'Editora não encontrada' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Exceção ocorrida no servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}