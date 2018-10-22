(function ($) {
    $(document).ready(function () {
        Drupal.behaviors.nodequery2 = {
            attach: function (context, settings) {
                var res = Drupal.settings.nodequery2;
                if (res) {

                    $.each(res, function (index, value) {

                        $("label[for=edit-" + index + "]").css('color', 'red');


                    });

                }

            }
        };
    });
})(jQuery);