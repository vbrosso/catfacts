$( document ).ready(function() {
    let numberFacts = 5;
    //CARREGAR PRIMEIROS 5 FATOS
    function loadFact(numberFacts){
        const myUrl = 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=' + numberFacts;
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        $.ajax({
            url: proxy + myUrl,
            beforeSend: function() {
                $("#botao").hide();
                $("#loading").show();
            },
            complete:function(data){
                $("#loading").hide();
                const obj = data.responseJSON;
                $("#listaFatos").empty();
                if (numberFacts == 1){
                    $('#listaFatos').append('<li class="list-group-item item"><span>'+obj.text+'</span><i class="fas fa-sync-alt"></i></li>');
                }
                else{
                    for (let i = 0; i < obj.length; i++) {
                        $('#listaFatos').append('<li class="list-group-item item'+[i]+'"><span>'+obj[i].text+'</span><i class="fas fa-sync-alt"></i></li>');
                    }
                }
                $("#botao").show();
                $('html, body').animate({
                    scrollTop: $("#listaFatos").offset().top
                }, 2000);
            }
        });
    }
    loadFact(numberFacts);

    //BOTAO CARREGAR NOVOS FATOS
    $(document).on("click", "#botao" , function() {
        let numberFacts = $('#inputNumber').val();
        if ( numberFacts >= 1 && numberFacts <= 15){
            $('#errorNumber').hide();
            $('#inputNumber').val('');
            loadFact(numberFacts);
        }
        else{
            $('#errorNumber').show().delay(5000).fadeOut();
        }
    });

    //CARREGA FATO INDIVIDUAL
    $(document).on("click", ".list-group-item" , function() {
        const myUrl = 'https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=' + 1;
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        $(this).text('Loading...');
        $.ajax({
            url: proxy + myUrl,
            context:this,
            complete:function(data){
                let obj = data.responseJSON.text;
                console.log(obj);
                $(this).html('<span>' + obj + '</span><i class="fas fa-sync-alt"></i>');
            }
        });
        return false;   
    });
});