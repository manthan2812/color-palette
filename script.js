$(document).ready(function () {
    loadRandomColours();
    loadColourShades();
});

$(document).on('click', '[class*=box]', function () {
    navigator.clipboard.writeText($(this).find('.p1').text());
    $('.copied-text').fadeIn(200).delay(700).fadeOut(500);
});

$('input[name="color-format"]').on('change', function () {
    if ($('input[name="color-format"]:checked').val() === 'hex') {
        $('.hex-value-div').removeClass('hide');
        $('.rgb-value-div').addClass('hide');
        $('.hsl-value-div').addClass('hide');
    } else if ($('input[name="color-format"]:checked').val() === 'rgb') {
        $('.hex-value-div').addClass('hide');
        $('.rgb-value-div').removeClass('hide');
        $('.hsl-value-div').addClass('hide');
    } else if ($('input[name="color-format"]:checked').val() === 'hsl') {
        $('.hex-value-div').addClass('hide');
        $('.rgb-value-div').addClass('hide');
        $('.hsl-value-div').removeClass('hide');
    } else {
        $('.hex-value-div').addClass('hide');
        $('.rgb-value-div').addClass('hide');
        $('.hsl-value-div').addClass('hide');
    }

    displayColorValue();
});

$('.slider').on('input', function () {
    if ($('input[name="color-format"]:checked').val() === 'hex') {
        let hexValue = parseInt($(this).val().trim()).toString(16).toUpperCase();
        if (hexValue.length == 1)
            hexValue = "0" + hexValue;
        $(this).closest('.row').find('input[type="text"]').val(hexValue);
    } else {
        $(this).closest('.row').find('input[type="number"]').val(parseInt($(this).val().trim()));
    }

    displayColorValue();
});

$('input[type="text"]').on('input', function () {
    $(this).val($(this).val().trim().toUpperCase().replace(/[^A-F0-9]/gi, ''));

    if ($(this).val().trim() === '') {
        $(this).closest('.row').find('.slider').val(0);
    } else {
        if (parseInt($(this).val().trim(), 16) < 0) {
            $(this).val('00');
        }
        if (parseInt($(this).val().trim(), 16) > 255) {
            $(this).val('FF');
        }
        $(this).closest('.row').find('.slider').val(parseInt($(this).val().trim(), 16));
    }

    displayColorValue();
});

$('input[type="number"]').on('input', function () {
    if ($(this).val().trim() === '') {
        $(this).closest('.row').find('.slider').val(0);
    } else {
        if (parseInt($(this).val().trim()) < parseInt($(this).attr('min'))) {
            $(this).val(parseInt(($(this).attr('min'))));
        }
        if (parseInt($(this).val().trim()) > parseInt($(this).attr('max'))) {
            $(this).val(parseInt(($(this).attr('max'))));
        }
        $(this).closest('.row').find('.slider').val(parseInt($(this).val().trim()));
    }

    displayColorValue();
});

$('.picked-color').on('click', function () {
    if ($(this).val() !== '') {
        if ($('input[name="color-format"]:checked').val() === 'hex') {
            $('.copied-text').text('HEX VALUE COPIED');
        } else if ($('input[name="color-format"]:checked').val() === 'rgb') {
            $('.copied-text').text('RGB VALUE COPIED');
        } else if ($('input[name="color-format"]:checked').val() === 'hsl') {
            $('.copied-text').text('HSL VALUE COPIED');
        }
        navigator.clipboard.writeText($(this).val());
        $('.copied-text').fadeIn(200).delay(700).fadeOut(500);
    }
});

function displayColorValue() {
    let colorCode = '';

    if ($('input[name="color-format"]:checked').val() === 'hex') {
        let rr = $('.hex-value-div #rr').val();
        let gg = $('.hex-value-div #gg').val();
        let bb = $('.hex-value-div #bb').val();
        if (rr.length === 0)
            rr = '00';
        else if (rr.length === 1)
            rr = '0' + rr;
        if (gg.length === 0)
            gg = '00';
        else if (gg.length === 1)
            gg = '0' + gg;
        if (bb.length === 0)
            bb = '00';
        else if (bb.length === 1)
            bb = '0' + bb;
        colorCode = '#' + rr + gg + bb;
    } else if ($('input[name="color-format"]:checked').val() === 'rgb') {
        let r = $('.rgb-value-div #r').val();
        let g = $('.rgb-value-div #g').val();
        let b = $('.rgb-value-div #b').val();
        if (r.length === 0)
            r = '0';
        if (g.length === 0)
            g = '0';
        if (b.length === 0)
            b = '0';
        colorCode = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    } else if ($('input[name="color-format"]:checked').val() === 'hsl') {
        let h = $('.hsl-value-div #h').val();
        let s = $('.hsl-value-div #s').val();
        let l = $('.hsl-value-div #l').val();
        if (h.length === 0)
            h = '0';
        if (s.length === 0)
            s = '0';
        if (l.length === 0)
            l = '0';
        colorCode = 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
    }

    $('.picked-color').val(colorCode);
    $('.bg-colour-div').css('background-color', colorCode);
}

function loadRandomColours() {
    let hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    let hexCodeList = [];
    while (hexCodeList.length < 144) {
        let hexCode = '#';
        for (let index = 1; index <= 6; index++) {
            hexCode += hexDigits[Math.floor(Math.random() * 16)];
        }

        if (!hexCodeList.includes(hexCode)) {
            hexCodeList.push(hexCode);
        }
    }

    for (let index = 0; index < hexCodeList.length; index++) {
        let rgbColor = HexToRGB(hexCodeList[index]);
        let hslColor = RGBToHSL(rgbColor.r, rgbColor.g, rgbColor.b);

        $('.random-colour-div').append('<div class="col-6 col-sm-4 col-md-3 col-xl-2 box' + index + '"></div>');
        $('.random-colour-div .box' + index).css('background-color', hexCodeList[index]);
        $('.random-colour-div .box' + index).append('<div class="inside-text">' +
            '<p class="p1">' + hexCodeList[index] + '</p>' +
            '<p class="p2">rgb(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ')</p>' +
            '<p class="p3">hsl(' + hslColor.h + ',' + hslColor.s + '%,' + hslColor.l + '%)</p>' +
            '</div>');
    }
}

function loadColourShades() {
    for (let index = 0; index < 360; index++) {
        let hslColor = 'hsl(' + index + ',100%,50%)';
        let hexColor = HSLToHex(index, 100, 50).toUpperCase();
        let rgbColor = HexToRGB(hexColor);

        $('.colour-shades-div').append('<div class="col-6 col-sm-4 col-md-3 col-xl-2 box' + index + '"></div>');
        $('.colour-shades-div .box' + index).css('background-color', hslColor);
        $('.colour-shades-div .box' + index).append('<div class="inside-text">' +
            '<p class="p1">' + hexColor + '</p>' +
            '<p class="p2">rgb(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ')</p>' +
            '<p class="p3">' + hslColor + '</p>' +
            '</div>');
    }
}

function HexToRGB(hexCode) {
    const r = parseInt(hexCode.slice(1, 3), 16);
    const g = parseInt(hexCode.slice(3, 5), 16);
    const b = parseInt(hexCode.slice(5, 7), 16);
    return {
        r,
        g,
        b
    };
}

function HSLToHex(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
    } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
    } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
    } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
    } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
    } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length == 1)
        r = '0' + r;
    if (g.length == 1)
        g = '0' + g;
    if (b.length == 1)
        b = '0' + b;

    return '#' + r + g + b;
}

function RGBToHSL(r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;
    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return {
        h,
        s,
        l
    };
}