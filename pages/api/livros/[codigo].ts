import { NextApiRequest, NextApiResponse } from 'next';
import ControleLivro from '../../../classes/controle/ControleLivros';

const controleLivro = new ControleLivro();

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { codigo } = req.query;
    try {
        if (req.method === "DELETE") {
            controleLivro.excluir(Number(codigo));
            res.status(200).json({ message: "Livro excluído com sucesso" });
        } else {
            res.status(405).json({ message: "Método não permitido" });
        }
    } catch (e) {
        res.status(500).json({ message: "Erro interno no servidor" });
    }

}