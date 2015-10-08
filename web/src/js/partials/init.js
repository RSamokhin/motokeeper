window.Handlers = {
    keydown: {
        clearError: function () {
            $(this).parent().removeClass('m-clean');
        }
    },
    keyup:{
        validatePhone: function () {
            var value = $(this).val();
            if (/^\+\d{1}\(\d{3}\)\d{3}-\d{2}-\d{2}$/.test(value)) {
                $(this).attr('data-checked', 'true');
            } else {
                $(this).attr('data-checked', 'false');
            }
        }
    },
    click: {
        sendRequest: function () {
            var data,
                $inputs = $('.calculator__box-container').find('select, input'),
                filled = true;
            [].forEach.call($inputs, function (input) {
                var $input = $(input);
                if (!$input.val() || (input.hasAttribute('data-checked') && $input.attr('data-checked') !== 'true')) {
                    filled = false;
                    $input.parent().addClass('m-clean');
                }
            });

            if (filled) {
                data = [].reduce.apply($inputs, [function (a, b) {
                    return a + ' ' + b.value;
                }, 'Заявка: ']);
                console.log(data);
            }
        }
    },
    change: {
        calculatePrice: function() {
            var $fields = $('[data-bind-change="calculatePrice"]'),
                $priceField = $('.calculator-price'),
                $commentPrice = $('.calculator-price-comment'),
                filled = true,
                price,
                $monthField = $('[data-month]'),
                saleShipPrice= 3000,
                fullMonth = 6,
                saleShip = 0;

            $fields.each(function (index, field) {
                var $field = $(field);
                if (!$field.val()) {
                    $field.parent().addClass('m-clean');
                    filled = false;
                } else {
                    $field.parent().removeClass('m-clean');
                }
            });

            if (filled) {
                price = [].reduce.apply($fields, [function (a, b) {
                    return a * b.value;
                }, 1]);
                if (parseInt($monthField.val()) < fullMonth) {
                    saleShip = 2000;//saleShipPrice - (saleShipPrice/fullMonth) * $monthField.val();
                    price += saleShip;
                }
                $priceField.text(price + ' руб');
                $commentPrice.text('');
                if (saleShip) {
                    $commentPrice.text('Из них ' + saleShip + 'руб. за доставку. ');
                }
                $commentPrice.text($commentPrice.text() + 'Звони скорее!!!!');
            }
        }
    }
};
Object.keys(window.Handlers).forEach(function (bindFunctionEvent) {
    Object.keys(window.Handlers[bindFunctionEvent]).forEach(function (bindFunctionName) {
        $(document.body).on(bindFunctionEvent, '[data-bind-'+bindFunctionEvent+'*='+bindFunctionName+']', window.Handlers[bindFunctionEvent][bindFunctionName]);
    });
});