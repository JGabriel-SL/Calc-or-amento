document.getElementById('serviceType').addEventListener('change', function() {
    var serviceType = this.value;
    document.getElementById('interpretacaoFields').style.display = (serviceType === 'interpretacao') ? 'block' : 'none';
    document.getElementById('traducaoFields').style.display = (serviceType === 'traducao') ? 'block' : 'none';
});

function calculate() {
    var serviceType = document.getElementById('serviceType').value;
    var resultDetails = '';

    if (serviceType === 'interpretacao') {
        var eventName = document.getElementById('eventName').value;
        var eventType = document.getElementById('eventType').value;
        var eventDuration = parseInt(document.getElementById('eventDuration').value);
        var recorded = document.getElementById('recorded').value === 'sim';
        var address = document.getElementById('address').value;

        var valorHora, qtdInterpretes;

        if (eventType === 'artisticoCultural') {
            valorHora = 192.00;
        } else {
            valorHora = 144.00;
        }

        if (eventDuration <= 60) {
            qtdInterpretes = 1;
        } else if (eventDuration <= 360) {
            qtdInterpretes = 2;
        } else {
            qtdInterpretes = 2 + Math.ceil((eventDuration - 360) / 360);
            valorHora = 130.00;
        }

        var valorTotalHoras = valorHora * qtdInterpretes * (eventDuration / 60);
        var direitoImagem = recorded ? 0.20 * valorTotalHoras : 0;
        var valorTotal = valorTotalHoras + direitoImagem;
        var impostos = 0.155 * valorTotal;

        resultDetails += `
            <p>Valor da hora por intérprete: R$ ${valorHora.toFixed(2)}</p>
            <p>Quantidade de intérpretes: ${qtdInterpretes}</p>
            <p>Tempo total de horas: ${eventDuration / 60}</p>
            <p>Valor total das horas: R$ ${valorTotalHoras.toFixed(2)}</p>
            <p>Porcentagem de acréscimo do direito de imagem: ${recorded ? '20%' : '0%'}</p>
            <p>Valor total a ser pago: R$ ${valorTotal.toFixed(2)}</p>
            <p>Quantidade de imposto recolhido: R$ ${impostos.toFixed(2)}</p>
        `;
    } else if (serviceType === 'traducao') {
        var materialTitle = document.getElementById('materialTitle').value;
        var materialType = document.getElementById('materialType').value;
        var videoDuration = parseInt(document.getElementById('videoDuration').value);
        var subtitle = document.getElementById('subtitle').value === 'sim';
        var editionType = document.getElementById('editionType').value;
        var description = document.getElementById('description').value;

        var valorMinuto;

        if (materialType === 'propagandaMarcas') {
            valorMinuto = 250.00;
        } else if (materialType === 'videobook' || materialType === 'filme' || materialType === 'documentario') {
            valorMinuto = subtitle ? 96.00 : 60.00;
        } else {
            valorMinuto = 60.00;
        }

        var valorTotal = valorMinuto * videoDuration;
        var direitoImagem = 0.30 * valorTotal;
        var valorFinal = valorTotal + direitoImagem;
        var impostos = 0.155 * valorFinal;

        resultDetails += `
            <p>Valor do minuto: R$ ${valorMinuto.toFixed(2)}</p>
            <p>Tempo total em minutos: ${videoDuration}</p>
            <p>Valor total: R$ ${valorTotal.toFixed(2)}</p>
            <p>Porcentagem de acréscimo do direito de imagem: 30%</p>
            <p>Valor total a ser pago: R$ ${valorFinal.toFixed(2)}</p>
            <p>Quantidade de imposto recolhido: R$ ${impostos.toFixed(2)}</p>
        `;
    }

    document.getElementById('resultDetails').innerHTML = resultDetails;
    document.getElementById('result').style.display = 'block';
}