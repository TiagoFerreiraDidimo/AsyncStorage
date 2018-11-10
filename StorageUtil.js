import {AsyncStorage} from "react-native";


/**
 * Contém todas as asyncStorage para uso interno do aplicativo.
 *
 * @author Tiago Ferreira Dídimo
 */
export class StorageUtil {


    /**
     * Método que registra a item e quantidade.
     *
     * @param  c
     *          
     *
     * @returns {Promise<void>}
     *          Sem retorno.
     *
     * @author Tiago Ferreira Dídimo
     */
    static setItemLista = async (c) => {
        try {
            await AsyncStorage.setItem('c', c);
        } catch (error) {
        }
    };


    /**
     * Recupera a item e quantidade.
     *
     *
     * @returns {Promise<void>}
     *          Retorna uma promisse.
     *
     * @author Tiago Ferreira Dídimo
     */
    static async getItemLista() {
        try {
            return await AsyncStorage.getItem('c');
        } catch (error) {
        }
    };


    //----------- --------------------------


    //----------- --------------------------

    /**
     * Método que registra a chave de acesso do usuário.
     *
     * @param t
     *          Chave de acesso do usuário logado.
     *
     * @returns {Promise<void>}
     *          Sem retorno.
     *
     * @author Tiago Ferreira Dídimo
     */
    static setChaveAcesso = async (t) => {
        try {
            await AsyncStorage.setItem('t', t);
        } catch (error) {
        }
    };


    /**
     * Método que registra os dados do usuário.
     *
     * @param d
     *          Dados do usuário logado.
     *
     * @returns {Promise<void>}
     *          Sem retorno.
     *
     * @author Tiago Ferreira Dídimo
     */
    static setDados = async (d) => {
        try {
            await AsyncStorage.setItem('d', d);
        } catch (error) {
        }
    };


    /**
     * Recupera a chave de acesso.
     *
     * @returns {Promise<void>}
     *          Retorna uma promisse.
     *
     * @author Tiago Ferreira Dídimo
     */
    static async getChaveAcesso() {
        try {
            return await AsyncStorage.getItem('t');
        } catch (error) {
        }
    };

    /**
     * Recupera os dados básicos.
     *
     * @returns {Promise<void>}
     *          Retorna uma promisse.
     *
     * @author Tiago Ferreira Dídimo
     */
    static async getDados() {
        try {
            return await AsyncStorage.getItem('d');
        } catch (error) {
        }
    };


}



