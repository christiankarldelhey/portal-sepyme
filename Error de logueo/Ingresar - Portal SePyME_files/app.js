/**
 * Login JS
 * Author: Gabriel Fojo
 **/

$(document).ready(function() {

console.log('--- Login JS');

$.post( base_url+"user/login/check/idnumber", {'idnumber':'21976565'},function( data ) {
  console.log(data);
});

// remote: base_url+"user/login/check_email"

$('#nick').mask("99-99999999-9");

$("#registro").validate({
errorElement: "p",
errorClass: "small text-danger",
rules: {
            name: "required",
            lastname: "required",
            nick: {
                        required: true,
                        remote: base_url+"user/login/check/nick"
            },
            idnumber: {
                        required: true,
                        minlength: 6,
                        maxlength: 8,
                        remote: base_url+"user/login/check/idnumber"
            },
            passw: {
                        required: true,
                        minlength: 8
            },
            confirm_password: {
                        required: true,
                        minlength: 8,
                        equalTo: "#passw"
            },
            email: {
                        required: true,
                        email: true,
                        remote: base_url+"user/login/check/email"
            }
},
messages: {
            nombre: "Ingresar nombre",
            apellido: "Ingresar apellido",
            idorg: "Ingresar programa",
            nick: {
                        required: "Ingresar CUIT",
                        remote: "El CUIT ingresado ya se encuentra en nuestra base"
            },
            passw: {
                        required: "Ingresar contraseña",
                        minlength: "Ingresar 8   caracteres mínimo "
            },
            idnumber: {
                        required: "Ingresar DNI",
                        maxlength: "Ingresar 8  caracteres máximo ",
                        minlength: "Ingresar 6  caracteres mínimo ",
                        remote: "El DNI ingresado ya se encuentra en nuestra base"
            },
            confirm_password: {
                        required: "Ingresar contraseña",
                        minlength: "Ingresar 8 caracteres mínimo",
                        equalTo: "Verifica la contraseña ingresada "
            },
            email: {
                        required: "Ingresar un Email válido",
                        email: "Ingresar un Email válido",
                        remote: "El email ingresado ya se encuentra en nuestra base"
            },
            Telefono: {
                        required: "Ingresar un teléfono "
            },
            agree: "Please accept our policy"
}
});



//== Registro POST
// $(document).on('su','#bt_forgotpass',function(){
// var email=$("[name=email]").val();
// var nick=$("[name=nick]").val();
//   $.post('dna2/users2k/funciones.php',{cmd:'forgotPass',nick:nick,email:email},function(data){
//     var resp=data.split(",");//errcode,msg

//     if(resp[0]==1){ // OK
//       $("#reset-text").html('<i class="fa fa-check-circle fa-4x text-success m-b-1"></i><p>Le hemos enviado un email con un link para resetear su contraseña.</p>');
//       $("#reset-form").html('');
//     }else{
//       $("#reset-error").html(resp[1]);
//     }
//   });
// });



});