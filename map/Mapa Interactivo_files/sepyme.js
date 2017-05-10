//============== VARIABLES ================//
//array de marcadores
var markers = {
    incubadoras: [],
    clubes: [],
    ciudades: [],
    nodos: []
}

//urls para buscar cada marcador
var markersUrls = {
    incubadoras: globals.base_url+'map/marcador/get/Incubadoras',
    clubes: globals.base_url+'map/marcador/get/Clubes',
    ciudades: globals.base_url+'map/marcador/get/Nodos',
    nodos: globals.base_url+'map/marcador/get/Ciudades'
}

var infoWindows = [];

var mapa; //objeto mapa

//============== OBTIENE LOS DATOS DE LOS MARCADORES ================//
function getMarkersData() {
    $.each(markersUrls, function(index, url) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: 'JSON',
            async: false,
            success: function(data) {
                var tempMarkers = {};
                //inserto cantidad de markers en filtros
                $('#'+index).find('.badge').html("").html(data.length);
                //Agrego titulo de lista
                $('#lista-puntos').append('<div class="panel panel-default"> <div id="'+index+'" class="panel panel-heading" data-toggle="collapse" data-target="#'+index+'-lista"> <span class="fa-stack"> <img src="'+ globals.module_url + 'assets/img/' + index + '.png"> </span> '+index+' </div> <div class="collapse panel-body" id="'+index+'-lista"> </div> </div>');
                
                $.each(data, function(i, marker) {
                    $('#'+index+'-lista').append('<div class="col-sm-12 panel-body marker-link" data-markerid="'+i+'" data-organization="'+index+'">'+marker.nombre+',  '+marker.direccion+',  '+marker.web+' </div>');
                    var infowindow = getInfoWindow(index, marker);
                    var marcador = new google.maps.Marker({
                        position: new google.maps.LatLng(marker.latitud, marker.longitud),
                        map: mapa,
                        icon: globals.module_url + 'assets/img/' + index + '.png',
                    });
                    marcador.addListener('click', function() {
                        for (var i = 0; i < infoWindows.length; i++) {
                            infoWindows[i].close();
                        }
                        infowindow.open(mapa, marcador);
                    });

                    markers[index].push(marcador);
                });
            }
        });
    });
}

//============== INICIA LOS FILTROS ================//
$(window).resize(function() {
    $('aside').css('height', $(window).height() - 72);
});

$('#filters').click(function() {
    $('.filters').slideToggle(300);
});

$('#results').click(function() {
    $('.results').slideToggle(300);
});

//oculta o muestra los markers con indice = al ID del .filter
$('.filter').click(function() {
    var indice = $(this).attr('id');
    if ($(this).hasClass('on')) {
        $(this).removeClass('on');
        ocultarMarcadores(indice);
    } else {
        $(this).addClass('on');
        mostrarMarcadores(indice);
    }
});


/*======================================================//
----------------------- FUNCIONES ----------------------
/*======================================================*/


//==============INICIA EL MAPA ================//
function initMap() {
    // Create a map object and specify the DOM element for display.
    mapa = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: -34.924711,
            lng: -57.946014
        },
        scrollwheel: true,
        zoom: 7
    });
    getMarkersData();
    // Trigger a click event on each marker when the corresponding marker link is clicked
    $('.marker-link').on('click', function () {
        var marcador = markers[$(this).data('organization')][$(this).data('markerid')];
        google.maps.event.trigger(marcador, 'click');
        mapa.setCenter(marcador.latitud, marcador.longitud);
        $('.marker-link').removeClass('selected');
        $(this).addClass('selected');
        $("html, body").animate({ scrollTop: $("#map").offset().top }, 1500);
    });
}

//============== OCULTA MARCADORES EN MAPA ================//
function ocultarMarcadores(indice) {
    var markerIndex = markers[indice];
    for (var i = 0; i < markerIndex.length; i++) {
        markerIndex[i].setMap(null);
    }
}

//============== Muestra MARCADORES EN MAPA ================//
function mostrarMarcadores(indice) {
    var markerIndex = markers[indice];
    for (var i = 0; i < markerIndex.length; i++) {
        markerIndex[i].setMap(mapa);
    }
}

function getInfoWindow(indice, data) {
    var contentString = '<div id="content">' +
        '<h2 id="iw-titulo" class="iw-titulo">' + data.nombre + '</h2>' +
        '<div id="iw-body">' +
        '<p>Dirección: ' + data.direccion + '</p>' +
        '<p>Descripción: ' + data.descripcion + '</p>' +
        '<p>Email: ' + data.email + '</p>' +
        '<p>Teléfono: ' + data.telefono + '</p>' +
        '<p>Descripción: ' + data.descripcion + '</p>' +
        '<p>Web: <a href="' + data.web + '">' + data.web + '</a></p>' +
        '<p><a href="' + data.web + '">Más información</a></p>' +
        '</div>' +
        '</div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    infoWindows.push(infowindow);
    return infowindow;
}

