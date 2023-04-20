'use strict'

class card extends HTMLElement {
    constructor() {
        super()
        this.shadow = this.attachShadow({ mode: 'open' })
        this.nome = 'Nome do Aluno'
        this.foto = null
        this.cor = 'black'
        this.preco = '00.00'
        this.description = ''
    }

    static get observedAttributes() {
        return ['nome', 'foto', 'cor', 'preco', 'description']
    }

    attributeChangedCallback(nameAttr, oldValue, newValue) {
        this[nameAttr] = newValue
    }

    connectedCallback() {
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    styles() {
        const css = document.createElement('style')
        css.textContent = `
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .card{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
                border: 1px solid #ddd;
                border-radius: 5px;
                box-shadow: 0 0 8px #0006;
                cursor: pointer;
                background-color: ${this.cor};
            }

            .card__text{
                text-align: center;
                color: #fff;
                font-size: 1.5 rem;
                font-weight: 600;
            }

            .card__image{
                display: grid;
                place-items: center;
                height: 200px;
                width: 100%;
                background-color: #fff;
                background-image: url(${this.foto});
                object-fit: contain;
                background-size: contain;
                background-repeat: no-repeat;
            }
        `

        return css
    }

    component() {
        const card = document.createElement('div')
        card.classList.add('card')
        const nomeAluno = document.createElement('div')
        nomeAluno.classList.add('card__text')
        nomeAluno.textContent = this.nome
        const imagem = document.createElement('div')
        imagem.classList.add('card__image')
        const description = document.createElement('div')
        description.classList.add('card__text')
        nomeAluno.textContent = this.description
        const preco = document.createElement('div')
        preco.classList.add('card__text')
        preco.textContent = this.preco

        card.append(imagem, nomeAluno, preco, description)

        return card
    }
}

customElements.define('card-lohannes', card)

import { produtos } from './produtos.js'

const criaCard = (produto) => {
    const card = document.createElement('card-lohannes')
    card.nome = produto.name
    card.foto = `../img/${produto.image}`
    card.preco = `R$${produto.price}`
    card.description = produto.description

    return card
}

const carregarProdutos = () => {
    const container = document.getElementById('container')
    const cards = produtos.map(criaCard)

    container.replaceChildren(...cards)
}

carregarProdutos()