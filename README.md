# vue3-quasar-estoque

Aplicação de Estoque desenvolvido utilizando o framework [Vue.js 3](https://vuejs.org/), framework [Quasar](https://quasar.dev/) e a ferramenta open source [Supabase](https://supabase.com/).

Documentação do framework [Quasar](https://quasar.dev/vue-components/).

## Iniciar a aplicação

Para rodar o aplicativo utilize o seguinte comando:

```bash
quasar dev
```

Ou para iniciar no modo PWA utiliza o seguinte comando:

```bash
quasar dev -m pwa
```

Caso o framework Quasar ainda não esteja instalado no seu computador, utilize o seguinte comando:

**Obs:** Você deve possuir o `npm` instalado na sua máquina.

```bash
npm install -g @quasar/cli
```

## Dependências

Para instalar as dependências utilize o seguinte comando:

```bash
yarn
```

## Buildar a aplicação

Para buildar o aplicativo no modo PWA e utilizar em produção utilize o seguinte comando:

```bash
quasar build -m pwa
```

## Quasar

Verificar se existem novas atualizações de dependências do Quasar:

```bash
quasar upgrade
```

Instalar as novas atualizações de dependências do Quasar:

```bash
quasar upgrade -i
```

## Geração do Ícone da Aplicação

O ícone pode ser gerado utilizando o [Icon Genie CLI](https://quasar.dev/icongenie/introduction).

Para instalar globalmente no computador utilize o seguinte comando:

```bash
npm install -g @quasar/icongenie
```

**Obs:** Tamanho mínimo recomendado: 1024x2024.

Para criar um ícone você pode utilizar o site [Canva](https://www.canva.com/).

Em seguida é só salvar o ícone da raiz do projeto.

E depois rodar o seguinte comando para gerar os novos ícones:

```bash
icongenie generate -m pwa -i ./icon.png
```

Em seguida, o HTML apresentado no resultado da execução do comando deve ser copiado e colado no arquivo `index.html` sobreescrevendo os ícones antigos.

## Avaliar a qualidade do PWA

Qualidade do APP PWA: [PWA BUILDER](https://www.pwabuilder.com/).

Tipo de Categorias utilizadas no Manifesto: [Manifest Categories Types](https://github.com/w3c/manifest/wiki/Categories).

Criar um icone Maskable: [Maskable](https://maskable.app/editor).
