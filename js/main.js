$(function() {

  calc.init();

    $(calc.money_input).change(function(){
        calc.input_slide(calc.money_input);
    })
    $(calc.time_input).change(function(){
        calc.input_slide(calc.time_input);
    })
});

function Item(){
    var name, input = " ",
        min, max, value = 0;
}
Item.prototype = (function() {
        var gradient = function(value){
                
        var color = '#419641';
        return '-webkit-linear-gradient(left, '+ color + ' '+ value + '%, transparent '+ value + '%)'

    }
    
    return {
        data: function(data) {
            return $(this.name).data(data);
        },
        slider: function(){
          var min = this.min,
              max = this.max,
              value = this.value,
              input = "input";
          
         	var gradient_value = 100 * (value - min) / (max - min);
          
            $(this.name).css('background-image', gradient(gradient_value)).next(input).val(this.value);

            $(this.name).slider({
                min: min,
                max: max,
                value: value,

                slide: function (event, ui){
                    var left = 100 * (ui.value - min) / (max - min);
                    $(this).next(this.input).val(ui.value);
                    $(this).css(
                        'background-image', gradient(left)
                    );
                    calc.calc();
                }
            })
        }
    }
})();

calc = {
  	money_name: ".how-much-js",
  	time_name: ".how-long-js",
  	money_input: ".calc-credit-js",
  	time_input: ".calc-month-js",
    calc_value: ".calc-value-js",
   	min: "min",
  	max: "max",
  	value: "value",
  	currency: " PLN",

    init: function(){
        money = new Item();
        money.name = this.money_name;
        money.min = money.data(this.min);
        money.max = money.data(this.max);
        money.value = money.data(this.value);
        money.slider();
        money.input = this.money_input;

        time = new Item();
        time.name = this.time_name;
        time.min = time.data(this.min);
        time.max = time.data(this.max);
        time.value = time.data(this.value);
        time.slider();
        time.input = this.time_input;

    },

    calc: function(){
        how_much = money.input;
        how_long = time.input;
        value = this.calc_value;

        var calcCredit = $(how_much).val();
        var calcMonth = $(how_long).val();

        $(value).html(Math.ceil(calcCredit/calcMonth*1,2) + this.currency);
    },

    input_slide: function(item) {
        var input = item;
        var input_value = $(input).val();

        if(item==money.input){
            money.value = input_value;
            money.slider();
        }
        else {
            time.value = input_value;
            time.slider();
        }
        calc.calc();
    }
}