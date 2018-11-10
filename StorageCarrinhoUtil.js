import {AlertToastUtil} from "./AlertToastUtil";
import {StorageUtil} from "./StorageUtil";

export class StorageCarrinhoUtil {


    code;


    constructor() {
        StorageUtil.getItemLista().then(
            value => {
                this.code =  JSON.parse(value);
            }
        );


    }
    /**
     * Verificacao de storage vazio.
     *
     * @param adc
     *
     * @returns {Promise<void>}
     *          Retorna uma promisse.
     *
     * @author Tiago Ferreira Dídimo
     */
    static async verificaCarrinho(adc){
        StorageUtil.setItemLista(adc);
        AlertToastUtil.alertSucesso(this.code);

    };
}
