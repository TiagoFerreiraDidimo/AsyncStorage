import React, {Component} from 'react';
import {
    ScrollView,
    View,
    Text,
    TouchableHighlight,
    Image,
    Dimensions,
} from 'react-native';
import {Detalhes_style} from './Detalhes_style';
import {Icon} from 'react-native-elements';
import {ItemModel} from "../../model/ItemModel";
import {WsB} from "../../service/WsB";
import Spinner from 'react-native-loading-spinner-overlay';
import {Item_service} from "../../service/Item_service";
import NumericInput from 'react-native-numeric-input';
import {StorageCarrinhoUtil} from "../../util/StorageCarrinhoUtil";
import {AlertToastUtil} from "../../util/AlertToastUtil";
/**
 * Tela de Detalhes Item
 *
 * @author Tiago Ferreira Dídimo
 */

const BannerHeight = Dimensions.get('window').height;

export default class Detalhes_component extends Component {


    // Configurações de navegação da página.
    static navigationOptions = {
        header: null,
    };
    // FIM - Configurações de navegação da página.


    constructor(props) {
        super(props);

        this.itemModel = new ItemModel();
        this.item_service = new Item_service();
        this.state = {
            isSpinner: true,
            value : 1,
            _item: [],
            adc: {}
        };
        const params = JSON.parse(this.props.navigation.state.params);
        this.itemModel.codeItem =params.codeItem;
        this.carregaDadosItem();
    }


    render() {

        const valores =  this.state._item;

        return (

            <ScrollView keyboardShouldPersistTaps="always" style={{backgroundColor: '#fdeec3'}}>
                <Spinner
                    visible={this.state.isSpinner}
                    color={'#ffffff'}
                    overlayColor={'rgba(0, 0, 0, 0.65)'}
                    textContent={this.state.mensagemSpinner}
                    textStyle={{color: '#FFF'}}
                />
                <View style={[Detalhes_style.container,{height:BannerHeight}]}>
                    <View  style={{paddingLeft: 15, marginTop: -100, flexDirection: 'row'}}>
                        <Icon
                            type={'font-awesome'}
                            name={'angle-down'}
                            size={40}
                            containerStyle={{marginHorizontal: 5, width: 50}}
                            color={'#f9a03f'}
                            underlayColor={'transparent'}
                            onPress={() =>  this.props.navigation.navigate('loja')}/>
                        <Text style={{fontWeight: '200', fontSize: 18, width:'60%', color:'#3a2416', textAlign:'center', marginTop:5}}>DETALHES DO ITEM</Text>
                    </View>

                    <View style={{paddingLeft: 15, paddingTop: 10, paddingBottom: 30, borderColor: '#fdecc5',borderBottomWidth: 1, window: '80%'}}>
                        <Text style={{marginLeft: 10,fontWeight: 'bold', fontSize: 30, width:'60%', color:'#3a2416'}}>{valores.nomeItem}</Text>
                        <Text style={{marginLeft: 10,fontWeight: 'bold', fontSize: 14, width:'60%', color:'#f9a03f'}}>Cerveja</Text>
                        <Image
                            style={{marginLeft: 10, width: '90%', height: 150, borderRadius:5, marginTop:15}}
                            source={{ uri:  WsB.WS_FOTO+valores.fotoItem }}/>
                    </View>

                    <View style={{paddingTop: 30, paddingBottom: 30,borderColor: '#fdecc5',borderBottomWidth: 1}}>
                        <View style={{marginLeft: '20%'}}>
                            <NumericInput
                                value={this.state.value}
                                onChange={value => this.setState({value})}
                                totalWidth={200}
                                totalHeight={50}
                                iconSize={25}
                                step={1}
                                minValue={1}
                                maxValue={10}
                                valueType='integer'
                                rounded
                                inputStyle={{fontSize:26, fontWeight:'bold'}}
                                containerStyle={{borderColor: '#fcf6e8', borderWidth: 0}}
                                initValue={this.state.value}
                                textColor='#f9a03f'
                                iconStyle={{fontWeight:'bold',color: '#3a2416',borderColor: '#fcf6e8'}}
                                rightButtonBackgroundColor='#fcf6e8'
                                leftButtonBackgroundColor='#fcf6e8'/>
                        </View>
                    </View>

                    <View style={{marginTop: 95, paddingBottom: 0}}>
                        <TouchableHighlight
                            onPress={this.adcionarItem}
                            style={{width: '90%', height: 60, backgroundColor:'#f9a03f', borderRadius:5, position: 'absolute', left:'5%',}} >
                            <View style={{flexDirection: 'row', padding:20}}>
                                <Text style={{fontWeight:'bold', width:'80%'}}>Adicionar</Text>
                                <Text style={{fontWeight:'bold', width:'20%'}}>R$ {valores.valorItem * this.state.value}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <Spinner
                        visible={this.state.isSpinner}
                        color={'#ffffff'}
                        overlayColor={'rgba(0, 0, 0, 0.60)'}
                        textContent={"Carregando, aguarde..."}
                        textStyle={{color: '#FFF'}}
                    />
                </View>

            </ScrollView>


        );
    }



    /**
     * @function Retorna dados nescéssarios da informação da carrinho
     *
     * @author Tiago Ferreira Dídimo
     */
    adcionarItem = () => {
        this.state.adc = {"code": this.itemModel.codeItem, "qts":this.state.value};
        StorageCarrinhoUtil.verificaCarrinho(JSON.stringify(this.state.adc));
    };

    /**
     * @function Retorna dados nescéssarios
     *
     * @author Tiago Ferreira Dídimo
     */
    carregaDadosItem = () => {
        this.item_service.postDetalhes(this.itemModel).then(
            sucesso => {
                this.setState(() => {
                    return {
                        isSpinner: false,
                    };
                });
                if(Number.parseInt(sucesso.t) === 0){
                    AlertToastUtil.alertAtencao(sucesso.erro);
                }else if(Number.parseInt(sucesso.t) === 1){
                    this.setState(() => {
                        return {_item :sucesso.sucesso};
                    });
                }
            }).catch(() => {


        });
    }

}