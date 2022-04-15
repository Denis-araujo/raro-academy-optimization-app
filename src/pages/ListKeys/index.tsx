import faker from "@faker-js/faker";
import { useState } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";

const iniciaInputs = (quantidade: number = 1) =>
  Array.from(Array(quantidade).keys()).map(() => faker.name.firstName());

export const ListKeys = () => {
  const [inputs, setInputs] = useState<string[]>(iniciaInputs(10));
  const [pagina, setPagina] = useState(1)
  const [itensPorPagina, setItensPorPagina] = useState(2)

  const ponteiroInicial = (pagina - 1) * itensPorPagina
  const ponteiroFinal = pagina * itensPorPagina
  const estouNaPrimeiraPagina = pagina === 1
  const estouNaUltimaPagina = ponteiroFinal >= inputs.length

  const addInput = () => {
    setInputs([faker.name.firstName(), ...inputs])
  };

  const incrementaPagina = () => {
    if(!estouNaUltimaPagina){
      setPagina(pagina + 1)
    }
  }

  const irParaUltimaPagina = () => {
    const ultimaPagina = inputs.length / itensPorPagina

    if(!Number.isInteger(ultimaPagina)){
      const irAteUltimaPagina = Math.floor(ultimaPagina) + 1
      return setPagina(irAteUltimaPagina)
    }

    setPagina(ultimaPagina)
  }
  
  const decrementaPagina = () => {
    if(!estouNaPrimeiraPagina){
      setPagina(pagina - 1)
    }
  }

  const irParaPrimeiraPagina = () => {
    setPagina(1)
  }

  return (
    <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
          <Button onClick={addInput}>adiciona input</Button>
          {
            inputs
            .slice(ponteiroInicial, ponteiroFinal)
            .map((input) => (
              <Input
                key={input}
                label={ input }
                name={ input }
              />
            ))
          }
        </div>
        <div className="mt-4">
          <div className="flex justify-between space-x-2">
            <Button onClick={irParaPrimeiraPagina}>{`<<`}</Button>
            <Button onClick={decrementaPagina}>{`<`}</Button>
            <Button onClick={incrementaPagina}>{`>`}</Button>
            <Button onClick={irParaUltimaPagina}>{`>>`}</Button>
          </div>
        </div>
        <h1>{pagina}</h1>
      </div>
    </div>
  )
}