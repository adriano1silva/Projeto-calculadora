function Calculadora () {
    this.display = document.querySelector('.display');
    this.historicoLista = document.querySelector('.historico-lista');

    this.inicia = () => {
        this.capturaCliques();
        this.capturaEnter();
        this.somenteNumerosDisplay();
        this.backSpace();
    };
    
    this.capturaEnter = () => {
        document.addEventListener('keyup', e => {
            if(e.key !== 'Enter') return;
            this.realizaConta();
        });
    };

    this.backSpace = () => {
        document.addEventListener('keyup', e =>{
            if(e.key !== 'Backspace') return;
            this.del();
        })
    };

    this.capturaCliques = () => {
        document.addEventListener('click', event => {
            const el = event.target;
            if(el.classList.contains('btn-num')) this.addNumDisplay(el);
            if(el.classList.contains('btn-clear')) this.clear(el);
            if(el.classList.contains('btn-del')) this.del(el);
            if(el.classList.contains('btn-eq')) this.realizaConta(el);
        });
    };
    
    this.addNumDisplay = el => {
        this.display.value += el.innerText;
        this.display.focus();
    };
    
    this.del = el => this.display.value = this.display.value.slice(0, -1);
    
    this.clear = () => this.display.value = '';

    this.somenteNumerosDisplay = () => { this.display.addEventListener('input', () => {
    this.display.value = this.display.value.replace(/[^0-9+\-*/.]/g, '');
    });
    }
    
    this.addHistorico = (expressao, resultado) => {
        const li = document.createElement('li');
        li.innerText = `${expressao} = ${resultado}`;
        this.historicoLista.prepend(li);
    }

    this.realizaConta = () => {
        try {
            const conta = eval(this.display.value);
            if(conta === undefined || conta === null){
                alert('Conta Invalida')
                return;
            }
            this.addHistorico(this.display.value, conta);
            this.display.value = conta;
        } catch (e) {
            alert('Conta Invalida');
            return;
        }
    };

};

const calculadora = new Calculadora();
calculadora.inicia();
