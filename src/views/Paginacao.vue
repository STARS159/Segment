<template>

  <div class="paginacao">
    <div class="row">
      <div class="col-lg-3 pr-1">
        <div class="nav-side-menu">
          <i
            class="fa fa-bars fa-2x toggle-btn"
            data-toggle="collapse"
            data-target="#menu-content"
          ></i>
          <div class="menu-list">
            <ul id="menu-content" class="menu-content collapse out">
              <li
                data-toggle="collapse"
                data-target="#add, #add3"
                class="active collapsed"
               aria-controls="add add3"
              >
                <a href="#">
                  <i class="glyphicon glyphicon-cog"></i>
                  <b style="font-size: 17px">Á</b>rea de
                  <b style="font-size: 17px">C</b>onfiguração
                  <span class="arrow"></span>
                </a>
              </li>
              <ul
                class="sub-menu collapsed collapse in"
                aria-expanded="true"
                id="add"
              >
                <li
                  id="criarProcessos"
                  data-toggle="collapse"
                  data-target="#add1"
                  class="active collapsed"
                  aria-expanded="false"
                > 
                
                  <b style="font-size: 15px">C</b>riar
                  <b style="font-size: 15px">P</b>rocessos
                </li>

                <form id="add1" @submit.prevent="criarProcesso">
                  <div  style="background: rgb(218, 218, 218)">
                    <div style="text-align: center">
                      <label for="checkGerador"> 
                        <input @click="randomNumber()" type="checkbox" id="checkbox" name="checkbox" v-model="checked" >
                      
                        Gerar processos com valores aleatórios ?

                            <button v-if="checked == true"
                           @click="randomNumber()"
                      
                              style="
                                float: right;
                                margin-right: 25px;
                                margin-bottom: 15px;
                                border-color: rgb(92, 184, 92);
                                color: rgb(92, 184, 92);
                              "
                              class="btn btn-outline-primary"
                              id="btnCad"
                            > 
                            <input type="hidden" id="processo"  v-model="aleatorio[0]" >
                            <input type="hidden" id="codigo" v-model="aleatorio[1]"  >
                            <input type="hidden" id="dado" v-model="aleatorio[2]" >
                            <input type="hidden" id="pilha" v-model="aleatorio[3]" >
                              <i class="fa fa-cogs" aria-hidden="true"></i>
                               <b> Gerar Processos </b>
                            </button>
                      </label>
                    </div>
                  </div>
                  <div v-if="checked == false">
                  <div class="form-group">
                    <input
                      placeholder="Processo:"
                      style="text-transform: capitalize"
                      type="text"
                      required
                      class="form-control"
                      id="processo"
                      name="processo"
                      @change="
                        $event.target.value = $event.target.value.toUpperCase()
                      "
                      maxlength="1"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      placeholder="Código:"
                      type="number"
                      min="1"
                      required
                      class="form-control"
                      id="codigo"
                      name="codigo"
                      @change="validaCampo"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      placeholder="Dados:"
                      type="number"
                      min="1"
                      required
                      class="form-control"
                      id="dado"
                      name="dado"
                      @change="validaCampo"
                    />
                  </div>
                  <div class="form-group">
                    <input
                      placeholder="Pilha:"
                      type="number"
                      min="1"
                      required
                      class="form-control"
                      id="pilha"
                      name="pilha"
                      @change="validaCampo"
                    />
                  </div>
                  
                  <div id="botoes" style="text-align: center">
                    <button class="btn btn-success" type="submit">
                      <i class="glyphicon glyphicon-plus-sign"></i>
                      Cadastrar
                    </button>
                    <button class="btn btn-danger" type="reset">
                      <i class="glyphicon glyphicon-remove-sign"></i>
                      Cancelar
                    </button>
                  </div>
                  </div>
                </form>
              </ul>
              <ul
                class="sub-menu collapsed collapse in 2"
                aria-expanded="true"
                id="add3"
              >
                <li
                  id="ListaProcessos"
                  data-toggle="collapse"
                  data-target="#add2"
                  class="active collapsed"
                  aria-expanded="false"
                >
                  <b style="font-size: 15px">L</b>istas de
                  <b style="font-size: 15px">P</b>rocessos
                </li>
                <div id="add2" class="row">
                  <div class="col-lg-12">
                    <div class="card">
                      <div class="card-body">

                        <span  
                          v-bind:item="item"
                          v-for="(item, index) in arrProcesso"
                          :key="index" 
                        >
                      
                          <button 
                            class="
                              btn btn-secondary btn-sm
                              distancia-botao-processos
                            " 
                            @click="processoSelecionado = index"
                            :style="
                              processoSelecionado == index
                                ? 'font-weight: bold; text-decoration: underline'
                                : null
                            "
                          >
                            {{ item.sig_processo }}
                          </button>
                          <button  
                            @click="removeProcesso(index), processoSelecionado = 0" 
                            class="
                              glyphicon glyphicon-remove-sign
                              btn btn-danger
                            "
                            
                          >        
                          </button>
                          <br />
                          <!--<button
                    class="btn btn-secondary btn-sm"
                    @click="recarregarPagina"
                  >Remover Processos</button>-->
                        </span>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </ul>
            </ul>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="row">
          <div class="col-sm-9 col-sm-offset-1">
            <div class="card">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-4 pr-1">
                    <h6 v-if="arrProcesso.length === 0">Segmentos</h6>
                    <span v-if="arrProcesso.length > 0">
                      <h6>Segmento 00 - Código</h6>
                      <table
                        class="table table-borderless table-memoria-fisica"
                      >
                        <thead>
                          <tr>
                            <th>Deslocamento</th>
                            <th>Bytes</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in arrProcesso[processoSelecionado]
                              .codigo.segmentos"
                            :bgcolor="
                              arrProcesso[processoSelecionado].codigo.corFundo
                            "
                            :key="item"
                          >
                           
                            <td>{{ item.deslocamento }}</td>
                            <td>{{ item.bytes }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <h6>Segmento 01 - Dados</h6>
                      <table
                        class="table table-borderless table-memoria-fisica"
                      >
                        <thead>
                          <tr>
                           
                            <th>Deslocamento</th>
                            <th>Bytes</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in arrProcesso[processoSelecionado].dado
                              .segmentos"
                            :bgcolor="arrProcesso[processoSelecionado].dado.corFundo"
                            :key="item"
                          >
                           
                            <td>{{ item.deslocamento }}</td>
                            <td>{{ item.bytes }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <h6>Segmento 10 - Pilha</h6>
                      <table
                        class="table table-borderless table-memoria-fisica"
                      >
                        <thead>
                          <tr>
                            <th>Deslocamento</th>
                            <th>Bytes</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in arrProcesso[processoSelecionado]
                              .pilha.segmentos"
                            :bgcolor="
                              arrProcesso[processoSelecionado].pilha.corFundo
                            "
                            :key="item"
                          >
                            <td>{{ item.deslocamento }}</td>
                            <td>{{ item.bytes }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </span>
                  </div>
                  <div class="col-lg-4 pl-1">
                    <h6>Tabela de Segmentos</h6>
                    <span v-if="arrTabelaSegmentos.length > 0">
                      <table class="table table-borderless table-memoria-fisica">
                        <thead>
                          <tr>
                            <th>Segmento</th>
                            <th>Base</th>
                            <th>Limite</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="item in arrTabelaSegmentos[
                              processoSelecionado
                            ]"
                            :bgcolor="item.corFundo"
                            :key="item"
                          >
                            <td>{{ item.segmento }}</td>
                            <td>{{ item.base }}</td>
                            <td>{{ item.limite }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </span>
                  </div>
                  <div class="col-lg-4 pl-1">
                    <h6>Memória Física</h6>
                    <table class="table table-borderless table-memoria-fisica">
                      <thead>
                        <tr>
                          <th>Endereço</th>
                          <th>Byte</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item,index) in arrMemoriaFisica"
                          :bgcolor="
                            item.byte !== '' ? item.corFundo : '#f0e68c'
                          "
                          :key="index"
                        >
                          <td>{{ item.endereco }}</td>
                          <td>{{ item.byte }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <small class="form-text text-muted"
      >*Tamanho da Memória Física Fixado: 16 Bytes</small
    >
  </div>
</template>

<script>

export default {
  name: "paginacao",
  data: function () {
    return {
      checked: false,
      processoSelecionado: 0,
      aleatorio: [
        0
        
       
      ],
      arrProcesso: [
        /*
        {
          sig_processo : ''
          codigo : [

          ],
          dados : [

          ],
          pilha : [

          ]
        }
      */
      ],
      arrTabelaSegmentos: [
        /*
        {
          00 : {base: '', limite: ''}
          01 : {base: '', limite: ''}
          10 : {base: '', limite: ''}
        }
        */
      ],
      /* Também Representa os Deslocamentos dos segmentos*/
      arrMemoriaFisica: [
        { posicao: 0, endereco: "00000", byte: "" },
        { posicao: 1, endereco: "00001", byte: "" },
        { posicao: 2, endereco: "00010", byte: "" },
        { posicao: 3, endereco: "00011", byte: "" },
        { posicao: 4, endereco: "00100", byte: "" },
        { posicao: 5, endereco: "00101", byte: "" },
        { posicao: 6, endereco: "00110", byte: "" },
        { posicao: 7, endereco: "00111", byte: "" },
        { posicao: 8, endereco: "01000", byte: "" },
        { posicao: 9, endereco: "01001", byte: "" },
        { posicao: 10, endereco: "01010", byte: "" },
        { posicao: 11, endereco: "01011", byte: "" },
        { posicao: 12, endereco: "01100", byte: "" },
        { posicao: 13, endereco: "01101", byte: "" },
        { posicao: 14, endereco: "01110", byte: "" },
        { posicao: 15, endereco: "01111", byte: "" },
        { posicao: 16, endereco: "10000", byte: "" },
        { posicao: 17, endereco: "10001", byte: "" },
        { posicao: 18, endereco: "10010", byte: "" },
        { posicao: 19, endereco: "10011", byte: "" },
        { posicao: 20, endereco: "10100", byte: "" },
        { posicao: 21, endereco: "10101", byte: "" },
        { posicao: 22, endereco: "10110", byte: "" },
        { posicao: 23, endereco: "10111", byte: "" },
        { posicao: 24, endereco: "11000", byte: "" },
        { posicao: 25, endereco: "11001", byte: "" },
        { posicao: 26, endereco: "11010", byte: "" },
        { posicao: 27, endereco: "11011", byte: "" },
        { posicao: 28, endereco: "11100", byte: "" },
        { posicao: 29, endereco: "11101", byte: "" },
        { posicao: 30, endereco: "11110", byte: "" },
        { posicao: 31, endereco: "11111", byte: "" },
      ],
    };
  },
  methods: {

    randomNumber(){
      this.aleatorio[0]= this.aleatorio[0]+1;
      for(var i=1;i<4;i++)
      {
        this.aleatorio[i]=Math.floor(Math.random() * (4 - 1 + 1)) + 1
      };
      
      return;
    },
    removeProcesso(id) {
       // console.log('Memoria Fisica',this.arrMemoriaFisica);
       console.log('Tabela Segmento',this.arrTabelaSegmentos);
       console.log('Tabela Segmento ID',this.arrTabelaSegmentos[id]);
       console.log('Tabela Segmento Sig_processo',this.arrTabelaSegmentos.sig_processo);
         console.log('Tabela Processo',this.arrProcesso);

      //delete this.arrTabelaSegmentos[id];
      // this.arrTabelaSegmentos[id] = this.arrTabelaSegmentos.filter(TabelaSegmentos => {TabelaSegmentos.id != id;})
      /* for(const item of this.arrTabelaSegmentos)
  this.arrMemoriaFisica[id] = this.arrMemoriaFisica.filter(MemoriaFisica => {MemoriaFisica.id != id;})

  this.arrProcesso = this.arrProcesso.filter(Processo => {
		return (Processo.id != id)});
	})*/

      // console.log(,"TESTE")

      const size = this.arrTabelaSegmentos[id].segmento00.base.length -1;
      var valor = 0;

      for (
        var z = 0;
        z <= this.arrTabelaSegmentos[id].segmento00.base.length - 1;
        z++
      ) {
        const position =
          this.arrTabelaSegmentos[id].segmento00.base.length - 1 - z;
        const bit =
          this.arrTabelaSegmentos[id].segmento00.base.charAt(position);

        if (bit == 1) {
          valor += Math.pow(2, z);
        }
      }

      for (var j = 0; j < this.arrTabelaSegmentos[id].segmento00.tamanho; j++) {
        this.arrMemoriaFisica[valor + j].byte = "";
        this.arrMemoriaFisica[valor + j].corFundo = null;
      }
      console.log("Teste");

      valor = 0;

      for (
        var z = 0;
        z <= this.arrTabelaSegmentos[id].segmento01.base.length - 1;
        z++
      ) {
        const position =
          this.arrTabelaSegmentos[id].segmento01.base.length - 1 - z;
        const bit =
          this.arrTabelaSegmentos[id].segmento01.base.charAt(position);

        if (bit == 1) {
          valor += Math.pow(2, z);
        }
      }

      for (var j = 0; j < this.arrTabelaSegmentos[id].segmento01.tamanho; j++) {
        this.arrMemoriaFisica[valor + j].byte = "";
        this.arrMemoriaFisica[valor + j].corFundo = null;
      }

      valor = 0;

      for (
        var z = 0;
        z <= this.arrTabelaSegmentos[id].segmento10.base.length - 1;
        z++
      ) {
        const position =
          this.arrTabelaSegmentos[id].segmento10.base.length - 1 - z;
        const bit =
          this.arrTabelaSegmentos[id].segmento10.base.charAt(position);

        if (bit == 1) {
          valor += Math.pow(2, z);
        }
      }

      for (var j = 0; j < this.arrTabelaSegmentos[id].segmento10.tamanho; j++) {
        this.arrMemoriaFisica[valor + j].byte = "";
        this.arrMemoriaFisica[valor + j].corFundo = null;
      }
      //this.$delete(this.arrTabelaSegmentos, id);
      this.arrTabelaSegmentos.splice(id, 1);
      console.log("TS", this.arrTabelaSegmentos);
      // this.arrProcesso.splice(id,1);
      this.arrProcesso.splice(id, 1);
    //  Vue.$delete(this.arrProcesso, id);
      console.log("Pr", this.arrProcesso);
    //  console.log("P", this.arrProcesso[i].id);

      return;

      /*
for(var i = 0 ; i<this.arrTabelaSegmentos.length; i++){
if(this.arrProcesso[id].sig_processo == this.arrTabelaSegmentos[i].sig_processo)
  {
  const size = this.arrTabelaSegmentos[i].segmento00.base.length-1;
  var valor = 0;

  for( var z = 0 ; z  <= this.arrTabelaSegmentos[i].segmento00.base.length-1; z++ ) {
   const position = this.arrTabelaSegmentos[i].segmento00.base.length-1 - z;
   const bit = this.arrTabelaSegmentos[i].segmento00.base.charAt(position);
   
   if ( bit == 1 ) {  
     valor += Math.pow(2,z);
     
} } 

    for(var j=0;j<this.arrTabelaSegmentos[i].segmento00.tamanho;j++){
      
      this.arrMemoriaFisica[valor+j].byte = "";
       this.arrMemoriaFisica[valor+j].corFundo = null;
      
    }
  console.log('Teste');
  
   valor = 0;
 
  for( var z = 0 ; z  <= this.arrTabelaSegmentos[i].segmento01.base.length-1; z++ ) {
   const position = this.arrTabelaSegmentos[i].segmento01.base.length-1 - z;
   const bit = this.arrTabelaSegmentos[i].segmento01.base.charAt(position);
   
   if ( bit == 1 ) {  
     valor += Math.pow(2,z);
    
} } 

    for(var j=0;j<this.arrTabelaSegmentos[i].segmento01.tamanho;j++){
      
      this.arrMemoriaFisica[valor+j].byte = "";
       this.arrMemoriaFisica[valor+j].corFundo = null;
      
    }

     
     valor = 0;

  for( var z = 0 ; z  <= this.arrTabelaSegmentos[i].segmento10.base.length-1; z++ ) {
   const position = this.arrTabelaSegmentos[i].segmento10.base.length-1 - z;
   const bit = this.arrTabelaSegmentos[i].segmento10.base.charAt(position);
 
   if ( bit == 1 ) {  
     valor += Math.pow(2,z);
    
} } 

    for(var j=0;j<this.arrTabelaSegmentos[i].segmento10.tamanho;j++){
      
      this.arrMemoriaFisica[valor+j].byte = "";
       this.arrMemoriaFisica[valor+j].corFundo = null;
      
    }
       this.$delete(this.arrTabelaSegmentos, i); 
       console.log('TS',this.arrTabelaSegmentos)
       this.$delete(this.arrProcesso, i);
      console.log('P',this.arrProcesso)
     break

  
	
  
  }
 
*/
      /*

const size = this.arrTabelaSegmentos[id].segmento00.base.length-1;
var valor = 0;


for( var i = 0 ; i  <= size; i++ ) {
   const position = size - i;
   const bit = this.arrTabelaSegmentos[id].segmento00.base.charAt(position);
   console.log(bit,"bit");
   if ( bit == 1 ) {  
     valor += Math.pow(2,i);
     console.log(i,'valor',valor);
} } 


var tamanhototal = parseInt(this.arrTabelaSegmentos[id].segmento00.tamanho);
tamanhototal += parseInt(this.arrTabelaSegmentos[id].segmento01.tamanho);
tamanhototal += parseInt(this.arrTabelaSegmentos[id].segmento10.tamanho);
console.log('tamanhototal',tamanhototal);



for(var i=0; i<tamanhototal ; i++){
  
  console.log(valor,'posiçãoinicial2');
  this.arrMemoriaFisica[valor].byte = "";
   this.arrMemoriaFisica[valor].corFundo = null;
  valor += 1;
}*/
      /*
    for(const item of this.arrTabelaSegmentos){
      console.log('a2',item);
        if(this.arrProcesso[id].sig_processo == this.arrTabelaSegmentos[i].sig_processo){
       console.log('a',valor);
      
        }
    }
*/
      // this.arrMemoriaFisica[id].byte = null;
    },

    criarProcesso(event) {
      const sig_processo = event.target.processo.value;
      const codigo = event.target.codigo.value;
      const dado = event.target.dado.value;
      const pilha = event.target.pilha.value;

      //Verifica se a sigla/nome do processo já foi cadastrado
      for (const item of this.arrProcesso) {
        if (item.sig_processo === sig_processo) {
          alert(`Processo "${sig_processo}" já cadastrado.`);
          return;
        }
      }

      //Verifica se há espaço na memória física

      if (
        parseInt(codigo) + parseInt(dado) + parseInt(pilha) >
        this.arrMemoriaFisica.filter((item) => item.byte === "").length
      ) {
        alert("Epaço insuficiente na memória física.");
        return;
      }

      const novoProcesso = {
        id: this.arrProcesso.length,
        sig_processo,
        codigo: {
          tamanho: codigo,
          segmentos: this.criarSegmento(codigo, "codigo"),
          corFundo: this.geraCorAleatoria(),
        },
        dado: {
          tamanho: dado,
          segmentos: this.criarSegmento(dado, "dado"),
          corFundo: this.geraCorAleatoria(),
        },
        pilha: {
          tamanho: pilha,
          segmentos: this.criarSegmento(pilha, "pilha"),
          corFundo: this.geraCorAleatoria(),
        },
      };

      //Adiciona o novo processo na lista
      this.arrProcesso.push(novoProcesso);

      //Preencher Memoria fisica e monta a tabela de segmentos
      this.preencherMemoriaFisica(novoProcesso);

      //Selecionar o processo atual
      this.processoSelecionado = this.arrProcesso.length - 1;

      //Limpa Campo
      this.limparCampos(event);
    },

    criarSegmento(numberTamanho, strSegmento) {
      var arrSegmento = [];
      var objAux = {};
      for (var i = 0; i < numberTamanho; i++) {
        if (strSegmento === "codigo") {
          objAux.bytes = "C" + (i + 1);
        } else if (strSegmento === "dado") {
          objAux.bytes = "D" + (i + 1);
        } else if (strSegmento === "pilha") {
          objAux.bytes = "P" + (i + 1);
        }
        objAux.deslocamento = this.arrMemoriaFisica[i].endereco;
        arrSegmento.push(objAux);
        objAux = {};
      }
      return arrSegmento;
    },
    preencherMemoriaFisica(novoProcesso) {
      const self = this;

      function preencher(tamanho, arr, corFundo) {
        var aux = 0;
        var base;
        var limite;
        var m = 0;
        const memoriaFisicaLivre = self.arrMemoriaFisica.filter(
          (i) => i.byte === ""
        );
        console.log("ML", memoriaFisicaLivre[0].posicao);

        for (var i = 0; i < tamanho - 1; i++) {
          if (
            memoriaFisicaLivre[i].posicao !=
            memoriaFisicaLivre[i + 1].posicao - 1
          ) {
            console.log(tamanho, "entrou?");
            m = i + 1;
          }
        }

        /*
        const size = self.arrMemoriaFisica[0].endereco.length-1;
        var valor = 0;


        for( var i = 0 ; i  <= size; i++ ) {
        const position = size - i;
        const bit = memoriaFisicaLivre[i].endereco.charAt(position);
         if ( bit == 1 ) {  
         valor += Math.pow(2,i);
         console.log(i,'valor',valor);
        } }
*/

        for (m; m < memoriaFisicaLivre.length; m++) {
          if (aux === 0) {
            //base
            base = memoriaFisicaLivre[m].endereco;
          }

          for (var i = aux; i < arr.length; i++) {
            memoriaFisicaLivre[m].byte = arr[i].bytes;
            aux++;
            break;
          }
          memoriaFisicaLivre[m].corFundo = corFundo;
          if (aux == arr.length) {
            //limite
            if (m === memoriaFisicaLivre.length - 1)
              limite = memoriaFisicaLivre[m].endereco;
            else limite = memoriaFisicaLivre[m + 1].endereco;
            break;
          }
        }
        return {
          base,
          limite,
        };
      }

      const codigoBaseLimite = preencher(
        novoProcesso.codigo.tamanho,
        novoProcesso.codigo.segmentos,
        novoProcesso.codigo.corFundo
      );

      const dadoBaseLimite = preencher(
        novoProcesso.dado.tamanho,
        novoProcesso.dado.segmentos,
        novoProcesso.dado.corFundo
      );

      const pilhaBaseLimite = preencher(
        novoProcesso.pilha.tamanho,
        novoProcesso.pilha.segmentos,
        novoProcesso.pilha.corFundo
      );
      const novaTabela = {
        sig_processo: novoProcesso.sig_processo,
        segmento00: {
          tamanho: novoProcesso.codigo.tamanho,
          segmento: "00",
          base: codigoBaseLimite.base,
          limite: codigoBaseLimite.limite,
          corFundo: novoProcesso.codigo.corFundo,
        },
        segmento01: {
          tamanho: novoProcesso.dado.tamanho,
          segmento: "01",
          base: dadoBaseLimite.base,
          limite: dadoBaseLimite.limite,
          corFundo: novoProcesso.dado.corFundo,
        },
        segmento10: {
          tamanho: novoProcesso.pilha.tamanho,
          segmento: "10",
          base: pilhaBaseLimite.base,
          limite: pilhaBaseLimite.limite,
          corFundo: novoProcesso.pilha.corFundo,
        },
      };
      console.log(novaTabela);
      //Preenche tabela de segmentos
      this.arrTabelaSegmentos.push(
        /*[
        {
          segmento: "00",
          base: codigoBaseLimite.base,
          limite: codigoBaseLimite.limite,
          corFundo: novoProcesso.codigo.corFundo,
        },
        {
          segmento: "01",
          base: dadoBaseLimite.base,
          limite: dadoBaseLimite.limite,
          corFundo: novoProcesso.dado.corFundo,
        },
        {
          segmento: "10",
          base: pilhaBaseLimite.base,
          limite: pilhaBaseLimite.limite,
          corFundo: novoProcesso.pilha.corFundo,
        },
      ]*/
        novaTabela
      );
    },

    geraCorAleatoria() {
      const hexadecimais = "89ABCDEF";
      var cor = "#";
      for (var i = 0; i < 6; i++)
        cor += hexadecimais[Math.floor(Math.random() * 8)];
      return cor;
    },
    validaCampo(event) {
      if (event.target.value <= 0) {
        alert(
          `Campo "${event.target.name.toUpperCase()}" deve ser maior que zero.`
        );
        event.target.value =
          event.target.value <= 0 ? null : event.target.value;
      }
    },
    limparCampos(event) {
      event.target.processo.value = null;
      event.target.codigo.value = null;
      event.target.dado.value = null;
      event.target.pilha.value = null;
    },
    recarregarPagina() {
      location.reload(); 
    },
  },
};

</script>

<style scoped>
.table {
  font-size: 14px;
  text-align: center;
}
td {
  padding: 0;
  margin: 0;
  font-weight: bold;
}
.table-memoria-fisica {
  background-color: #f0e68c;
  width: 80%;
}
.distancia-botao-processos {
  margin-right: 2px;
}
</style>
