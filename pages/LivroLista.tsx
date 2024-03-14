import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { Menu } from '../componentes/Menu';
import Livro from '../classes/modelo/Livro';
import { LinhaLivro } from '../componentes/LinhaLivro';
import ControleLivro from '@/classes/controle/ControleLivros';
import Codigo from './api/livros/[codigo]';

const LivroLista = () => {
    const controleLivros = new ControleLivro();
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregado, setCarregado] = useState(false);

    useEffect(() => {
        controleLivros.obterLivros().then((resultado) => {
            setLivros(resultado);
            setCarregado(true);
        });
    });
    
    const excluir = (codigo: string) => {
        controleLivros.excluir(codigo).then(() => {
            setCarregado(false);
            controleLivros.obterLivros().then((resultado) => {
                setLivros(resultado);
                setCarregado(true);
            });
        });
    };
        

    
    return (
        <div className={styles.container}>
            <Head>
                <title>Catálogo de Livros</title>
            </Head>
            <Menu />
            <main className={styles.main}>
                <div className='container-fluid mx-3'>
                    <h1 className={styles.title}>Catálogo de Livros</h1>
                    <table className='table table-hover'>
                        <thead className='table-dark'>
                            <tr>
                                <th className='col-sm-2'>Título</th>
                                <th className='col-sm-6'>Resumo</th>
                                <th className='col-sm-2'>Editora</th>
                                <th className='col-sm-2'>Autores</th>
                            </tr>
                        </thead>
                        <tbody>
                            {livros.map((livro, index) => (
                                <LinhaLivro
                                    key={index}
                                    livro={livro}
                                    excluir={(codigo: number) => excluir(String(codigo))}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    )
}

export default LivroLista;