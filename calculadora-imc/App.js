import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [classificacao, setClassificacao] = useState('');
  const [cor, setCor] = useState('');
  const [erro, setErro] = useState('');

  const obterClassificacao = (valorImc) => {
    if (valorImc < 18.5) {
      return {
        texto: 'Abaixo do Peso',
        cor: '#FFA500' // Laranja Claro
      };
    } else if (valorImc >= 18.5 && valorImc <= 24.9) {
      return {
        texto: 'Peso Normal (Eutrofia)',
        cor: '#2ECC71' // Verde
      };
    } else if (valorImc >= 25.0 && valorImc <= 29.9) {
      return {
        texto: 'Sobrepeso',
        cor: '#F39C12' // Amarelo Escuro
      };
    } else if (valorImc >= 30.0 && valorImc <= 34.9) {
      return {
        texto: 'Obesidade Grau I',
        cor: '#FF8C00' // Laranja/Vermelho Claro
      };
    } else if (valorImc >= 35.0 && valorImc <= 39.9) {
      return {
        texto: 'Obesidade Grau II (Severa)',
        cor: '#E74C3C' // Vermelho
      };
    } else {
      return {
        texto: 'Obesidade Grau III (Mórbida)',
        cor: '#C0392B' // Vermelho Escuro
      };
    }
  };

  const calcularIMC = () => {
    // Validação dos campos
    if (!peso || !altura) {
      setErro('Por favor, preencha todos os campos!');
      setImc(null);
      setClassificacao('');
      setCor('');
      return;
    }

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    // Validação de valores
    if (isNaN(pesoNum) || isNaN(alturaNum) || pesoNum <= 0 || alturaNum <= 0) {
      setErro('Por favor, insira valores válidos e maiores que zero!');
      setImc(null);
      setClassificacao('');
      setCor('');
      return;
    }

    // Cálculo do IMC
    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    const imcFormatado = imcCalculado.toFixed(2);

    // Obter classificação e cor
    const resultado = obterClassificacao(imcCalculado);

    // Atualizar estados
    setErro('');
    setImc(imcFormatado);
    setClassificacao(resultado.texto);
    setCor(resultado.cor);
  };

  const limparCampos = () => {
    setPeso('');
    setAltura('');
    setImc(null);
    setClassificacao('');
    setCor('');
    setErro('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de IMC</Text>
      <Text style={styles.subtitulo}>Índice de Massa Corporal</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Peso (kg):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 70"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Altura (m):</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 1.75"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />
      </View>

      {erro !== '' && (
        <Text style={styles.erro}>{erro}</Text>
      )}

      <View style={styles.botoesContainer}>
        <TouchableOpacity style={styles.botaoCalcular} onPress={calcularIMC}>
          <Text style={styles.textoBotao}>Calcular IMC</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
          <Text style={styles.textoBotao}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {imc !== null && (
        <View style={styles.resultadoContainer}>
          <Text style={styles.resultadoTitulo}>Seu IMC:</Text>
          <Text style={styles.imcValor}>{imc}</Text>
          <View style={[styles.classificacaoContainer, { backgroundColor: cor }]}>
            <Text style={styles.classificacaoTexto}>{classificacao}</Text>
          </View>
        </View>
      )}

      <View style={styles.tabelaInfo}>
        <Text style={styles.infoTitulo}>Classificação IMC (OMS):</Text>
        <Text style={styles.infoTexto}>{'< 18.5: Abaixo do Peso'}</Text>
        <Text style={styles.infoTexto}>{'18.5 - 24.9: Peso Normal'}</Text>
        <Text style={styles.infoTexto}>{'25.0 - 29.9: Sobrepeso'}</Text>
        <Text style={styles.infoTexto}>{'30.0 - 34.9: Obesidade Grau I'}</Text>
        <Text style={styles.infoTexto}>{'35.0 - 39.9: Obesidade Grau II'}</Text>
        <Text style={styles.infoTexto}>{'≥ 40.0: Obesidade Grau III'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2C3E50',
    marginBottom: 5,
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#7F8C8D',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495E',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  erro: {
    color: '#E74C3C',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: '600',
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
  },
  botaoCalcular: {
    backgroundColor: '#3498DB',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
    alignItems: 'center',
  },
  botaoLimpar: {
    backgroundColor: '#95A5A6',
    padding: 15,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultadoContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultadoTitulo: {
    fontSize: 18,
    color: '#7F8C8D',
    marginBottom: 10,
  },
  imcValor: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  classificacaoContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 200,
    alignItems: 'center',
  },
  classificacaoTexto: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabelaInfo: {
    backgroundColor: '#ECF0F1',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  infoTitulo: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  infoTexto: {
    fontSize: 12,
    color: '#34495E',
    marginVertical: 2,
  },
});