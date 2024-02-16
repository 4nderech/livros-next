import ControleEditora from '../classes/controle/ControleEditora';
import Livro from '../classes/modelo/Livro';

const controleEditora = new ControleEditora();

interface LinhaLivroProps {
    livro: Livro;
    excluir: (codigo: number) => void;
}

export const LinhaLivro: React.FC<LinhaLivroProps> = (props) => {
    const { livro, excluir } = props;
    const nomeEditora = controleEditora.getNomeEditora;

    return (
        <tr>
            <td>
                <p>{livro.titulo}</p>
                <button type="button" className="btn btn-danger" onClick={() => excluir(livro.codigo)}>Excluir</button>
            </td>
            <td>{livro.resumo}</td>
            <td>{nomeEditora(livro.codEditora)}</td>
            <td>
                <ul>
                    {livro.autores.map((autor, index) => (
                        <li key={index}>{autor}</li>
                    ))}
                </ul>
            </td>
        </tr>
    );
}
