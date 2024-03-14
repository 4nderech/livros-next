import React, { useState } from 'react';
import { useRouter } from "next/router";
import ControleEditora from '../classes/controle/ControleEditora';
import ControleLivro from '@/classes/controle/ControleLivros';
import Livro from '../classes/modelo/Livro';
import { Menu } from '../componentes/Menu';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

const LivroDados = () => {
    const controleLivros = new ControleLivro();
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState('');
    const navigate = useRouter().push;

    const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const livro: Livro = {
            codigo: '',
            codEditora: codEditora.toString(),
            titulo,
            resumo,
            autores: autores.split('\n'),
        };
        await controleLivros.incluir(livro);
        navigate('/LivroLista');
    };
    
    return (
        <div className={styles.container}>
            <Head>
                <title>Adicionar Livro</title>
            </Head>
            <Menu />
            <main className={styles.main}>
                <div className='container justify-content-center'>
                    <h1 className={styles.title}>Adicionar Livro</h1>

                    <form onSubmit={incluir}>
                        <div className='form-group'>
                            <label htmlFor="titulo">Título:</label>
                            <input
                                type="text"
                                className='form-control'
                                id="titulo"
                                value={titulo}
                                onChange={(event) => setTitulo(event.target.value)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor="resumo">Resumo:</label>
                            <textarea
                                id="resumo"
                                className='form-control'
                                value={resumo}
                                onChange={(event) => setResumo(event.target.value)}
                            ></textarea>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="editora">Editora:</label>
                            <select
                                className='form-control'
                                id="editora"
                                value={codEditora}
                                onChange={(event) => setCodEditora(event.target.value)}>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="autores">Autores:</label>
                            <textarea
                                className='form-control'
                                id="autores"
                                value={autores}
                                onChange={(event) => setAutores(event.target.value)}
                            ></textarea>
                        </div>
                        <button type="submit" className='btn btn-primary mt-2'>Salvar Dados</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default LivroDados;